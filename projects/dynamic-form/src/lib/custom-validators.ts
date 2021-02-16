import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {

  /** Start Number Validation
   *
   * check for valid number ::: CustomValidators.number()
   * check for valid number and min value :: CustomValidators.number({min: 0})
   *  check for valid number and max value :: CustomValidators.number({max: 20})
   * check for valid number and value range ie: [0-20] ::  CustomValidators.number({min: 0, max: 20})
   *
   */
  static number(prms: { min?: number, max?: number } = {}): ValidatorFn {
    const obj = {};
    obj['number'] = true;
    return (control: FormControl): { [key: string]: string } => {

      // if (isPresent(Validators.required(control))) {
      //   return null;
      // }

      const val: number = control.value;

      if (isNaN(val) || /\D/.test(val.toString())) {
        return obj;
      } else if (!isNaN(prms.min) && !isNaN(prms.max)) {

        return val < prms.min || val > prms.max ? obj : null;
      } else if (!isNaN(prms.min)) {

        return val < prms.min ? obj : null;
      } else if (!isNaN(prms.max)) {

        return val > prms.max ? obj : null;
      } else {

        return null;
      }
    };
  }

}
