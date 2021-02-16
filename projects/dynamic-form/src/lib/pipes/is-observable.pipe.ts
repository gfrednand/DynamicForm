import { Pipe, PipeTransform } from '@angular/core';
import { isObservable } from 'rxjs';

@Pipe({
  name: 'isObservable',
})
export class IsObservable implements PipeTransform {
  transform(val) {
    return isObservable(val);
  }
}