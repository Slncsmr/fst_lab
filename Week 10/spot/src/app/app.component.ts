import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 
      `<div class="container">
          <label for="name">Name:</label>
          <input type="text" id="name" (input)="updateName($event)" placeholder="Enter your name"/>

          <p>Your Name: {{ Name }}</p>

          <p>Button clicked {{ clickCount }} times</p>
          <button (click)="incrementCounter()">Click Me</button>
      </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Name: string = '';
  clickCount: number = 0;

  incrementCounter() {
    this.clickCount++;
  }
  updateName(event: Event) {
    this.Name = (event.target as HTMLInputElement).value;
  }
}
