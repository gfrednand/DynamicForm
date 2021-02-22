import { Component, OnInit, HostBinding, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-input',
  template: `
<mat-form-field class="demo-full-width" [formGroup]="group" appearance="outline">
<mat-label> {{ field.label }} </mat-label>
<input matInput [formControlName]="field.key" [placeholder]="field.label" [type]="field.inputType"  (input)="fieldChange($event)">
<mat-hint align="start"  [ngClass]="{'danger': field.hintDanger}">{{field.hint}}</mat-hint>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.key).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field> 
`,
  // host: {'class': 'col-md-6'},
  styles: [
    ':host {display: grid }',
    '.danger { color:red }']
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Output() fieldValue = new EventEmitter();
  // @HostBinding('class') rowClass = 'col-md-6';
  constructor() { }
  ngOnInit() {


    //  this.rowClass = this.field.rowClass === 'large' ? 'col-md-12' : 'col-md-6';
  }

  fieldChange(event) {
    let object: any = {};
    if (this.field.listenToChanges) {
      this.fieldValue.emit({ value: event.target.value, field: this.field, object });
    }
  }
}
