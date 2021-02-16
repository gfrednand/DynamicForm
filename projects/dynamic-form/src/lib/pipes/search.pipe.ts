import {Pipe, PipeTransform} from '@angular/core';

/**
 * A search pipe to help to search items using thier property
 * just pass multiple properties using comma separated list
 * Usage: items | search:'obj_property_1,obj_property_2...,obj_property_n':searchValue
 */
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: any, strict: any = false) {
    if (!term) {  return value; }
    if (typeof term === 'string') {
      if (strict) {
        return (value || [])
        .filter((item) => keys.split(',')
        .some(key => item.hasOwnProperty(key) && new RegExp(term, 'gy')
        .test(item[key])));
      } else {
        return (value || [])
        .filter((item) => keys.split(',')
        .some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi')
        .test(item[key])));
      }
    } else {
      let retValue = [];
      term.forEach((t) => {
        retValue = retValue.concat((value || [])
        .filter((item) => keys.split(',')
        .some(key => item.hasOwnProperty(key) && new RegExp(t, 'gi')
        .test(item[key]))));
      });
      return retValue;
    }

  }
}
