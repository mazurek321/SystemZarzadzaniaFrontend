import { Component, OnInit } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { TopBar } from '../top-bar/top-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Navigation, TopBar, CommonModule],
  template: `
    <app-navigation (hiddenChange)="onMenuToggle($event)"/>
    <app-top-bar [user]="user$ | async"/>

    <div class="container" [class.collapsed-padding]="isMenuHidden">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './home.css'
})
export class Home implements OnInit{
  isMenuHidden = false;
  user$;

  onMenuToggle(hidden: boolean) {
    this.isMenuHidden = hidden;
  }
  
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ){
    this.user$ = this.usersService.currentUser$;
  }

  ngOnInit()
  {
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/auth/sign-in']);
    else{
      this.usersService.getCurrentUsersData().subscribe({
        next: user=>{
          console.log('User loaded', user);
        },
        error: () => {
          this.authService.logout();
          this.router.navigate(['/auth/sign-in']);
        }
      })
    }
    
  }
  
}
