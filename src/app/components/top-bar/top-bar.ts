import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { UserDto } from '../../services/users/users';
import { CommonModule } from '@angular/common';
import { AppNotification, NotificationService } from '../../services/notifications/notification-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar implements OnInit{

  @Input() user: UserDto | null = null;
  
  notifIsHidden = true;
  userIsHidden = true;

  notifications: AppNotification[] = [];

  private notificationSub?: Subscription; 

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit()
  {
    this.notificationSub = this.notificationService.noifications$.subscribe(notifications=>{
      if(notifications)
      {
        this.notifications = notifications;
        this.cd.detectChanges();
      }
    })
  }

  ngOnDestroy()
  {
    this.notificationSub?.unsubscribe();
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(["auth/sign-in"]);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  toggleNotif()
  {
    this.notifIsHidden = !this.notifIsHidden
    this.userIsHidden = true;

    if(!this.notifIsHidden)
      this.markAllNotificationsAsRead();

  }



  toggleUserPanel()
  {
    this.userIsHidden = !this.userIsHidden
    this.notifIsHidden = true;
  }


  markAllNotificationsAsRead() {
    const unreadIds = this.notifications
      .filter(n => !n.isRead)
      .map(n => n.id);

    if (unreadIds.length === 0) return;

    this.notificationService.markAsRead(unreadIds).subscribe(() => {
      this.notifications = this.notifications.map(n =>
        unreadIds.includes(n.id) ? { ...n, isRead: true } : n
      );

      this.cd.detectChanges(); 
    });
  }

}
