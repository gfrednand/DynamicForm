import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig, FieldType } from './field.interface';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,) { }

  selectedKeyValue = {};

  isVisible(field: FieldConfig, form: FormGroup, option): boolean {

    if (option) {
      this.selectedKeyValue[field.key] = option;
    }
    const conditions = {};
    let visible = true;
    const allVisibleResults = []; // true , false
    let joiningValues = []; //  }&&{ for && , }||{ for ||
    if (field.showWhen) {
      let showWhen: string[] = [];
      const showWhenWithoutSpace = field.showWhen.replace(/\s/g, ''); // removing all whitespace
      showWhen = showWhenWithoutSpace.match(/({([^}]*)})/g) || []; // get string inside {}
      joiningValues = showWhenWithoutSpace.match(/\}(.*?)\{/g) || [];  // get string inside }{
      let count = 0;

      showWhen.forEach((item: string) => {
        conditions[count] = item.match(/\((.*?)\)/g); // get string inside ()

        conditions[count] = conditions[count].map((el: string) =>
          el.replace('(', '').replace(')', '') // Removing ()
        );
        const conditionObjectArr = conditions[count][0].split('.'); // check if key contains '.' meaning its a object

        let controlValue = null;

        if (conditionObjectArr.length === 1) {
          controlValue = form.get(conditionObjectArr[0])
            ? form.get(conditionObjectArr[0]).value
            : null;
        } else if (conditionObjectArr.length === 2 && Object.keys(this.selectedKeyValue).length > 0) {
          controlValue = this.selectedKeyValue[conditionObjectArr[0]][conditionObjectArr[1]];
        }

        const matchControlValue =
          conditions[count][2] === 'true'
            ? true
            : conditions[count][2] === 'false'
              ? false
              : conditions[count][2] === 'null'
                ? null
                : conditions[count][2];


        visible = this.isValid(controlValue, matchControlValue, conditions[count][1]); // Checking for Conditions Validity

        allVisibleResults.push(visible);
        count++;
      });
      let joinValCount = 0;
      joiningValues.forEach(joinValue => {
        if (joinValue === '}&&{') {
          visible = allVisibleResults[joinValCount] && allVisibleResults[joinValCount + 1];
        }
        if (joinValue === '}||{') {
          visible = allVisibleResults[joinValCount] || allVisibleResults[joinValCount + 1];
        }
        joinValCount = joinValCount + 2;
      });
    }
    return visible;
  }

  isValid(controlValue, matchControlValue, relationalOperatorName) {
    let isValid = false;
    switch (relationalOperatorName) {
      case '==':
        isValid = controlValue === matchControlValue;
        break;
      case '!=':
        isValid = controlValue !== matchControlValue;
        break;
      case '>':
        isValid = parseFloat(controlValue) > parseFloat(matchControlValue);
        break;
      case '<':
        isValid = parseFloat(controlValue) < parseFloat(matchControlValue);
        break;
      case '>=':
        isValid = parseFloat(controlValue) >= parseFloat(matchControlValue);
        break;
      case '<=':
        isValid = parseFloat(controlValue) <= parseFloat(matchControlValue);
        break;
    }
    return isValid;
  }



  // Creating Form Control and Assigning Initial Values
  createControl(fields: FieldConfig[], formData) {
    const group = this.formBuilder.group({});
    fields.forEach((field) => {
      if (field.type === 'button') {
        return;
      }
      const key = field.key;
      let initialValue = formData ? formData[key] : null;
      if (field.type === FieldType.checkbox) {
        initialValue = initialValue || false;
      } else if (field.inputType === 'number') {
        initialValue = initialValue || 0;
      }
      const control = this.formBuilder.control(
        { value: field.value || initialValue, disabled: field.disabled || false }, // Priority to Field Value
        this.bindValidations(field.validations || [])
      );
      group.addControl(key, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach((valid) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  onSubmit(event: Event, form: FormGroup, fields: FieldConfig[]) {
    event.preventDefault();
    event.stopPropagation();
    if (form.valid) {
      const data = form.value;
      fields.forEach(field => {
        if (field.type === FieldType.date) {
          data[field.key] = this.datePipe.transform(data[field.key], field.dateFormat || 'dd/MM/yyyy');
        }
      });
      return data;
    } else {
      this.validateAllFormFields(form);
    }
  }
}
