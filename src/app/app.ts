import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  template: '<router-outlet></router-outlet>',
  styles: ''
})
export class App {
  protected readonly title = signal('TaskManagment');
}
