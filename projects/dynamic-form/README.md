# DynamicForm

* A simple dynamic form `component` to be used in component html.
* This components enhances the funtionality of Angular Form Fields.
* It is developed using `Angular >=8.0.0` and its newly introduced `ng g library` schematics.
* Library location: `projects/dynamic-form` directory of this repository.

## Installation

`npm i @gfrednand/dynamic-form`

## API

`import { DynamicFormModule } from '@gfrednand/dynamic-form'`<br>

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| fields           | array   | **YES**                    | [{key: '',...}]                                                                                           |
| form             |FormGroup| **YES**                    | FormGroup from angular form.                                                                              |
| isFormOpen       | boolean | Optional, default: true    | Used to reset form when form is closed                                                                    |
| loading          | boolean | Optional, default: false   | Used to show loading on the form                                                                          |
| loadingMessage   | string  | Optional, default: ''      | String to display when loading Ex: `Please Wait, Loading ...`                                             |
| formData         | object  | Optional, default: 'null'  | Initial form values                                                                                       |

### @Outputs()

| Output           | Type       | Required | Description                                            |
| ---------------- | ---------- | -------- | ------------------------------------------------------ |
| form             | FormGroup  | Optional | emits form group with values.                          |
| submit           | FormGroup  | Optional | emits action to trigger submit of form                 |
| fieldData        | FormGroup  | Optional | emits realtime values from the fields                  |
| closeForm        | FormGroup  | Optional | emits action to trigger close of form                  |

## Usage

1) Register the `DynamicFormModule` in your app module.
 > `import { DynamicFormModule } from '@gfrednand/dynamic-form'`

 ```typescript
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormModule } from '@gfrednand/dynamic-form';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```

 2) Use the component selector `main-dynamic-form` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormService,FieldConfig } from '@gfrednand/dynamic-form';
@Component({
  selector: 'app-component',
  template: `<h3>DynamicForm demo app using Angular Material</h3>
        <main-dynamic-form [fields]="fields" [isFormOpen]="true" [form]="form" (submit)="submitForm($event)">
        </main-dynamic-form>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Paramteres for the input type are defined below. The url is generated using `json-server`.
  // Please run your own instance of the json-server to use the the below url.


  constructor(private dynamicFormService: DynamicFormService,) {}

  form: FormGroup;
  fields: FieldConfig[    {
        type: FieldType.input,
        label: 'Title',
        rowClass: 'col12',
        key: 'title',
        validations: [{ message: 'Title is Required', validator: Validators.required, name: 'required', }],
    },
    {
        type: FieldType.textarea,
        label: 'Description',
        rowClass: 'col12',
        key: 'description',
        validations: [{ message: 'Description is Required', validator: Validators.required, name: 'required', }],
    },];

  ngOnInit() {
      this.form = this.dynamicFormService.createControl(this.fields, null);
  }
}
```

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build the DynamicForm module

Run `ng build DynamicForm` to build the library. The build artifacts will be stored in the `dist/dynamic-form` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test DynamicForm` to execute the unit tests via [Karma](https://karma-runner.github.io).

