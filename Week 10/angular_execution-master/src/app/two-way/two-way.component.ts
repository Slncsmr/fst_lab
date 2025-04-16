import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="text"><br>  <!-- Two-way binding with ngModel -->
    <input bindon-ngModel="text"><br>  <!-- Deprecated two-way binding (bindon-ngModel) -->
    <input [value]="text" (input)="onInputChange($event)">  <!-- Manually binding -->
    <h1>{{text}}</h1>  <!-- Display the current value of text -->
  `
})
export class TwoWayComponent {
  text: string = "some text here";  // Initialize the text variable
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;  // Assert the target to be an HTMLInputElement
    this.text = input.value;  // Access the value property of HTMLInputElement
  }
}
