import { ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, FieldType } from '../field.interface';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Subscription } from 'rxjs';
import { AttachmentComponent } from '../attachment/attachment.component';
import { TextareaComponent } from '../textarea/textarea.component';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  attachment: AttachmentComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: TextareaComponent
};
@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnChanges, OnDestroy {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  // @Input() visible = true;
  @Output() fieldValue = new EventEmitter();
  @Output() cancelForm = new EventEmitter();
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
  ngOnChanges() {
    this.clear();
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    if (this.field.listenToChanges) {
      const sub: Subscription = this.componentRef.instance.fieldValue.subscribe(data => {
        this.fieldValue.emit(data);
      });
      this.componentRef.onDestroy(() => { sub.unsubscribe(); });
    }
    if (this.field.type === FieldType.button) {
      const sub2: Subscription = this.componentRef.instance.cancelForm.subscribe(() => {
        this.cancelForm.emit();
      });
      this.componentRef.onDestroy(() => { sub2.unsubscribe(); });
    }

    // if (!this.visible) {
    //   this.componentRef.destroy();
    // }

  }
  clear() {

    this.container.clear();
  }

}
