import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-date',
  template: `
<mat-form-field *ngIf="visible" class="demo-full-width margin-top" [formGroup]="group" appearance="outline">
<mat-label> {{ field.label }} </mat-label>
<input matInput [matDatepicker]="picker" [formControlName]="field.key" [placeholder]="field.label"  [min]="field.minDate || null" [max]="field.maxDate || null" readonly>
<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker #picker></mat-datepicker>
<mat-hint align="start"><strong>{{field.hint}}</strong> </mat-hint>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.key).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
`,
  // host: {'class': 'col-md-6'},
  styles: [
    ':host {display: grid }',]
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  visible = true;
  // @HostBinding('class') rowClass = 'col-md-6';
  constructor() { }
  ngOnInit() {
    // this.rowClass = this.field.rowClass === 'large' ? 'col-md-12' : 'col-md-6';
  }
}
