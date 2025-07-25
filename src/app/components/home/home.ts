import { Component } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { TopBar } from '../top-bar/top-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

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

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit()
  {
    console.log(this.authService.isLoggedIn())
    if(!this.authService.isLoggedIn())
      this.router.navigate(["/auth/sign-in"]);
  }

  onMenuToggle(hidden: boolean) {
    this.isMenuHidden = hidden;
  }
}
