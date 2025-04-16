import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'censor', standalone: true }) // ✅ Mark as standalone
export class CensorPipe implements PipeTransform {
  transform(input: string, replacement: string): string {
    const cWords = ['bad', 'rotten', 'terrible'];
    let out = input;
    for (let word of cWords) {
      out = out.replace(new RegExp(word, 'gi'), replacement);
    }
    return out;
  }
}
