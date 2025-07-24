import { Component } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { TopBar } from '../top-bar/top-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Navigation, TopBar],
  template: `
    <app-navigation (hiddenChange)="onMenuToggle($event)"/>
    <app-top-bar/>

    <div class="container" [class.collapsed-padding]="isMenuHidden">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './home.css'
})
export class Home {
  isMenuHidden = false;

  onMenuToggle(hidden: boolean) {
    this.isMenuHidden = hidden;
  }
}
