import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AttachmentComponent } from './attachment/attachment.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { InputComponent } from './input/input.component';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { IsObservable } from './pipes/is-observable.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { WithLoadingPipe, WithLoadingNoObsCheckPipe } from './pipes/with-loading.pipe';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DynamicFormComponent } from './dynamic-form.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    AttachmentComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    MatSelectSearchComponent,
    DynamicFieldDirective,

    // Pipes
    SearchPipe,
    IsObservable,
    WithLoadingPipe,
    WithLoadingNoObsCheckPipe,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  providers: [
    DatePipe
  ],
  exports: [
    DynamicFormComponent,
    MatSelectSearchComponent,

    // Pipes
    SearchPipe,
    IsObservable,
    WithLoadingPipe,
    WithLoadingNoObsCheckPipe,
  ]
})
export class DynamicFormModule { }
