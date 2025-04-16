import { Component } from '@angular/core';
import { CensorPipe } from '../pipes/censor.pipe';

@Component({
  selector: 'c-pipes',
  standalone: true,
  imports: [CensorPipe],
  template: ` {{ phrase | censor : '*****' }} `,
})
export class AppComponent1 {
  phrase: string = 'This bad phrase is rotten ';
}
