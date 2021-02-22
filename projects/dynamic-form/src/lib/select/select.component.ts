import { Component, OnInit, HostBinding, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="{options: (field.options | isObservable) ? ( field.options | withLoadingNoCheck | async): {value: field.options}} as data">
   
      <!-- <ng-template [ngIf]="data.options.value"> -->
    <mat-form-field class="demo-full-width margin-top" [hideRequiredMarker]="field?.hideRequiredMarker" [formGroup]="group" appearance="outline">
      <mat-label>{{field?.label}}</mat-label>
      <mat-select [placeholder]="field?.label" [formControlName]="field?.key" (selectionChange)="fieldChange($event)" [multiple]="field.multiple">
        <mat-option>
          <app-mat-select-search [formControl]="searchValueCtrl" placeholderLabel="Search"  [searching]="data.options.loading"></app-mat-select-search>
        </mat-option>
          <span *ngIf="!field.removeUnderscore; else removeUnderScore">
            <mat-option  *ngFor="let item of (data.options.value ? data.options.value : field.options) || [] | search: field.filterKey: filterVal | search: searchParameters: searchValueCtrl.value"
            [value]="item.value"
            [disabled]="item.disabled"
            [ngClass]="{'danger': item.danger}">{{item.name}}
          </mat-option>
          </span>
        <ng-template #removeUnderScore>
          <mat-option *ngFor="let item of (data.options.value ? data.options.value : field.options) || [] | search: field.filterKey: filterVal | search: searchParameters: searchValueCtrl.value"
           [value]="item.value" 
           [disabled]="item.disabled"
           [ngClass]="{'danger': item.danger}">{{ item.name | replace: '_' : ' '}}
        </mat-option></ng-template>
      </mat-select>
      <mat-hint ><strong>{{field.hint}}</strong> </mat-hint>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
      <mat-error *ngIf="group.get(field.key).hasError(validation.name)">{{validation.message}}</mat-error> 
      </ng-container>
    </mat-form-field>
    <!-- </ng-template> -->
    <ng-template [ngIf]="data.options.loading">
            <h6>Loading {{field?.label}} Options...</h6>
      </ng-template>
    </ng-container>
`,
  // host: {'class': 'col-md-6'},
  styles: [
   ':host {display: grid }',
    '.additional-selection { opacity: 0.75; font-size: 0.75em; }',
    '.danger { color:red }'
  ]
})
export class SelectComponent implements OnInit, AfterViewInit {
  field: FieldConfig;
  group: FormGroup;
  @Output() fieldValue = new EventEmitter();
  searching = false;
  searchValueCtrl: FormControl = new FormControl();
  filterVal;
  searchParameters: string;
  // fieldOptions: any;
  // @HostBinding('class') rowClass = 'col-md-6';
  constructor() { }
  ngAfterViewInit(): void {

    // this.fieldOptions = this.field.options;

  }
  ngOnInit() {

    this.filterVal = this.group.get(this.field.filterValueKey) ? this.group.get(this.field.filterValueKey).value : null;
    this.searchParameters = this.field.searchParameters ? this.field.searchParameters.join() : 'name';
  }

  fieldChange(event) {
    let object: any;
    if (this.field.listenToChanges) {
      if (isObservable(this.field.options)) {
        object = this.field.options.pipe(map((items: any[]) => items.find(element => element.value == event.value)));
      } else {
        object = this.field.options.find(element => element.value == event.value);
      }
      this.fieldValue.emit({ value: event.value, field: this.field, object });
    }
  }

}
