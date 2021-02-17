import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: any, args?: any, replaceItem?: any): any {

    return value.split(args).join(replaceItem);
  }


}
