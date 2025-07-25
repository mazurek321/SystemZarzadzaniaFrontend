import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { UserDto, UsersService } from '../../services/users/users';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar implements OnInit{

  currentUser$!: Observable<UserDto | null>;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit()
  {
    this.currentUser$ = this.usersService.currentUser$;
  }
  

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

  toggleUserPanel()
  {
    this.userIsHidden = !this.userIsHidden
    this.notifIsHidden = true;
  }

}
