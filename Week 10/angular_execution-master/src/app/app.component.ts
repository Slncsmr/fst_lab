import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent1 } from './c-pipes/c-pipes.component';
import { AppComponent2 } from './components/components.component';
import { AppComponent3 } from './pipes1/pipes.component';
import { AppComponent4 } from './typescript/typescript.component';
import { TwoWayComponent } from './two-way/two-way.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,AppComponent1,AppComponent2,AppComponent3,AppComponent4,TwoWayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'execution';
}
