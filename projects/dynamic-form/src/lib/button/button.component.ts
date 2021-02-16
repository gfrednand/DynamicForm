import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-button',
  template: `
<div class="margin-top save-right" style="display: flex;justify-content: end;"[formGroup]="group">
<button mat-raised-button color="primary" type="submit" [disabled] = "group.invalid || false" class="custom-btn green-btn">{{field.label}}</button>
</div>

`,

  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Output() cancelForm = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  closeForm() {
    this.cancelForm.emit();
  }
}
