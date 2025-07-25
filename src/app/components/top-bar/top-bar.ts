import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-top-bar',
  imports: [RouterModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

  constructor(private authService: AuthService, private router: Router) {}

  logout()
  {
    this.authService.logout();
    this.router.navigate(["auth/sign-in"]);
  }

  notifIsHidden = true;
  userIsHidden = true;

  toggleNotif()
  {
    this.notifIsHidden = !this.notifIsHidden
    this.userIsHidden = true;
  }

  toggleUser()
  {
    this.userIsHidden = !this.userIsHidden
    this.notifIsHidden = true;
  }

}
