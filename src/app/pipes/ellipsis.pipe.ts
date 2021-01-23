import { Pipe, PipeTransform } from '@angular/core';

export const ELLIPSIS_DEFAULT_MAX_LENGTH = 30;

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  public transform(text: string, maxLength = ELLIPSIS_DEFAULT_MAX_LENGTH): string {
    return text && text.length >= maxLength ? `${ text.slice(0, maxLength - 3) }...` : text;
  }
}
