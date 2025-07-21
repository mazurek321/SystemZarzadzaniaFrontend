import { Component } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { TopBar } from '../top-bar/top-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule,Navigation, TopBar],
  template: `
    <app-navigation/>
    <app-top-bar/>

    <router-outlet></router-outlet>
  `,
  styleUrl: './home.css'
})
export class Home {

}
