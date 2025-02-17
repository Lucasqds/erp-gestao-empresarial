import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rg'
})
export class RgPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length === 9) {
      return cleanedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d)$/, '$1.$2.$3-$4');
    } else if (cleanedValue.length === 8) {
      return cleanedValue.replace(/^(\d{1})(\d{3})(\d{3})(\d)$/, '$1.$2.$3-$4');
    }

    return value;
  }
}
