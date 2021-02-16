import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-checkbox',
  template: `
<div class="demo-full-width margin-top" [formGroup]="group" >
<mat-checkbox [formControlName]="field.key" (change)="toggleCheckbox($event)">{{field.label}}</mat-checkbox>
</div>
`,
  // host: {'class': 'col-md-6'},
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  // @HostBinding('class') rowClass = 'col-md-6';
  @Output() fieldValue = new EventEmitter();
  constructor() { }
  ngOnInit() {
    //  this.rowClass = this.field.rowClass === 'large' ? 'col-md-12' : 'col-md-6';
  }

  toggleCheckbox(event) {
    if (this.field.listenToChanges) {
    this.fieldValue.emit({ value: event.checked, field: this.field });
    }
  }
}
