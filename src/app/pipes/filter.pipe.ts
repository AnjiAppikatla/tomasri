import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], type: string): any[] {
    if (!items || !type || type === 'All') {
      return items;
    }
    return items.filter(item => item.type === type);
  }
}