import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PagedResult, UserDto, UsersService } from '../../services/users/users';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserSelector } from '../../shared/user-selector/user-selector';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule, UserSelector],
  templateUrl: './users.html',
  styleUrls: ['./users.css', '../tasks/tasks.css']
})
export class Users{
  users: UserDto[] = [];

  isSortHidden = true;
  isFilterHidden = true;

  isLoading = false;
  isError = false;
  

  constructor(
    private router: Router
  ){}

  goToUser(user: UserDto) {
    this.router.navigate(['/home/users', user.id]);
  }

   toggleSort()
  {
    this.isSortHidden = !this.isSortHidden;
    this.isFilterHidden = true;
  }
  toggleFilter()
  {
    this.isFilterHidden = !this.isFilterHidden;
    this.isSortHidden = true;
  }

  toggleCheckbox(event: MouseEvent): void
  {
    const target = event.currentTarget as HTMLElement;
    const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if(checkbox)
      checkbox.checked = !checkbox.checked;
    
    event.preventDefault();
  }
}
