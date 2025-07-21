import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [RouterModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

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
