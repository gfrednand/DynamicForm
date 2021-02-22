import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isObservable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DynamicFormService } from './dynamic-form.service';
import { FieldConfig, FieldType } from './field.interface';
@Component({
  exportAs: 'dynamicForm',
  selector: 'main-dynamic-form',
  template: `
  <mat-progress-bar *ngIf="loading" mode="buffer"></mat-progress-bar>
  <p *ngIf="loading">{{loadingMessage}}</p>

  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)" autocomplete="off">
<div class="row">
    <div *ngFor="let field of fields || []" [class]="field.rowClass || 'col6'" >
            <div *ngIf="isVisible(field)">
               <ng-container appDynamicField [field]="field" [group]="form" (cancelForm)="cancelForm()" (fieldValue)="fieldValue($event)"></ng-container>
            </div>
      </div>
</div>
  </form>
`,
  styleUrls: ['dynamic-form.component.scss']

})
export class DynamicFormComponent implements OnChanges, AfterContentChecked {
  @Input() fields: FieldConfig[] = [];
  @Input() formData: any = null;
  @Input() isFormOpen = true;
  @Input() loading = false;
  @Input() loadingMessage = 'Please Wait, Loading ...';
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() fieldData: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() form: FormGroup;

  selectedKeyValue = [];
  get value() {
    return this.form.value;
  }
  constructor(private dynamicFormService: DynamicFormService, private changeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnChanges() {
    // this.form = this.form && Object.keys(this.form.controls).length > 0 ? this.form : this.dynamicFormService.createControl(this.fields, this.formData);
    // console.log(this.form);
    if (!this.isFormOpen) {
      this.form.reset();
    }
  }


  cancelForm() {
    this.closeForm.emit();
  }

  isVisible(field: FieldConfig = null, option = null): boolean {
    if (field == null) {
      return false;
    } else {
      const visible = this.dynamicFormService.isVisible(field, this.form, option);
      if (field.visible === false) { return false; }
      if (field.type !== FieldType.button) {
        if (!visible) {
          this.form.controls[field.key].setValidators(null);
        } else {
          this.form.controls[field.key].setValidators(this.dynamicFormService.bindValidations(field.validations || []));
        }
        this.form.controls[field.key].updateValueAndValidity();
      }
      // console.log(field, visible);
      return visible;
    }

  }


  async fieldValue(data: { value: string; field: FieldConfig, object: any }) {
    this.fieldData.emit({ value: data.value, key: data.field.key, object: data.object });
    const dataField = this.fields.find(f => f.filterValueKey && (f.filterValueKey === data.field.key));
    let option = null;
    if (data.field && data.field.type === FieldType.select) {
      option = isObservable(data.field.options) ? await data.field.options.pipe(map((items: any[]) => items ? items.find(opt => opt.value === data.value) : null), first()).toPromise() :
        data.field.options.find(opt => opt.value === data.value); // TODO: add Null checking
    }

    this.isVisible(data.field, option);
    if (dataField) {
      this.fields = this.fields.map((field) => {
        return {
          ...field,
        };
      });
    }
  }

  onSubmit(event: Event) {
    this.submit.emit(this.dynamicFormService.onSubmit(event, this.form, this.fields));
  }


}
