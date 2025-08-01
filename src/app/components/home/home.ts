import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { TopBar } from '../top-bar/top-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users';
import { NotificationService } from '../../services/notifications/notification-service';

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
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef,
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
          this.notificationService.connect(user);
          this.cd.detectChanges();
        },
        error: () => {
          this.authService.logout();
          this.router.navigate(['/auth/sign-in']);
        }
      })
    }
    
  }
  
}
