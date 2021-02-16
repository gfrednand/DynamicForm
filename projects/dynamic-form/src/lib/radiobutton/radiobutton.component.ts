import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
@Component({
  selector: 'app-radiobutton',
  template: `



<fieldset *ngFor="let item of field.options">
    <label for="{{item.name}}_name">{{item.name}}</label>
    <input id="{{item.name}}_name" type="radio" formControlName="{{field.key}}" value="{{item.value}}">
</fieldset>
`,
  // host: {'class': 'col-md-6'},
  // styles: [
  //   '.dynamic-radio-group { display: flex; flex-direction: column;  margin: 15px 0; } .dynamic-radio-button {    margin: 5px;  }'
  // ]
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  // @HostBinding('class') rowClass = 'col-md-6';
  constructor() { }
  ngOnInit() {

    //  this.rowClass = this.field.rowClass === 'large' ? 'col-md-12' : 'col-md-6';
  }

 
}
