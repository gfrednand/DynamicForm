import { Observable } from "rxjs";
export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface Option { value: any; name: string; disabled?: boolean, loading?: boolean }
// export interface ControlCondition { key: any; value: any; }



export interface BaseConfig {
  label?: string;
  key?: string;
  hint?: string;
  inputType?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'time' | 'url' | 'hidden';
  options?: Option[] | any;
  collections?: any;
  type: FieldType;
  searchParameters?: string[];
  value?: any;
  disabled?: boolean;
  visible?: boolean;
  minDate?: Date;
  maxDate?: Date;
  multiple?: boolean;
  showWhen?: string;
  hideRequiredMarker?: boolean;
  colspan?: 1 | 2 | 3 | 4;
  validations?: Validator[];
  acceptType?: ('.pdf' | '.xls' | '.png' | '.jpg') [];
  filterValueKey?: string;
  filterKey?: string;
  dateFormat?: string;
  showCancel?: boolean;
  useObservable?: boolean;
  removeUnderscore?: boolean;
  listenToChanges?: boolean;
  buttonColor?: 'primary' | 'accent' | 'warn'
  buttonConfirmFirst?: boolean;
  buttonConfirmText?: boolean;
  hintDanger?: boolean;
}

interface DefaultQUestions extends BaseConfig {
  type: FieldType.input | FieldType.textarea | FieldType.date | FieldType.checkbox;
  key: string;
}
interface FormButton extends BaseConfig {
  type: FieldType.button;
}

interface QuestionAttachment extends BaseConfig {
  type: FieldType.attachment;
  acceptType: ('.pdf' | '.xls' | '.png' | '.jpg') [];
  key: string;
}

interface QuestionDropDownAndRadioButton extends BaseConfig {
  type: FieldType.select | FieldType.radiobutton;
  options: Option[];
  key: string;
}
interface QuestionDropDownAndWithObservable extends BaseConfig {
  type: FieldType.select | FieldType.radiobutton;
  options: Observable<any[]>;
  useObservable: boolean;
  key: string;
}
interface QuestionInput extends BaseConfig {
  type: FieldType.input;
  inputType: 'email' | 'number' | 'password' | 'tel' | 'text' | 'time' | 'url' | 'hidden';
  key: string;
}
export type FieldConfig = DefaultQUestions | QuestionAttachment | QuestionInput | QuestionDropDownAndRadioButton | QuestionDropDownAndWithObservable | FormButton;

export enum FieldType {

  input = 'input',

  textarea = 'textarea',

  radiobutton = 'radiobutton',

  select = 'select',

  date = 'date',

  button = 'button',

  checkbox = 'checkbox',

  attachment = 'attachment',

}

