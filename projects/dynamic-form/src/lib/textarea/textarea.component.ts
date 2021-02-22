import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
    selector: 'app-textarea',
    template: `
        <mat-form-field class="demo-full-width" [formGroup]="group" appearance="outline">
        <mat-label> {{ field.label }} </mat-label>
        <textarea matInput [formControlName]="field.key" [placeholder]="field.label" ></textarea>
        <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.key).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
        </mat-form-field>
`,
    // host: {'class': 'col-md-6'},
    styles: [
        ':host {display: grid }',]
})
export class TextareaComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    // @HostBinding('class') rowClass = 'col-md-6';
    constructor() { }
    ngOnInit() {


        //  this.rowClass = this.field.rowClass === 'large' ? 'col-md-12' : 'col-md-6';
    }
}
