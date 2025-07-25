import { Component, OnInit } from '@angular/core';
import { UserDto, UsersService } from '../../services/users/users';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userpage',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userpage.html',
  styleUrl: './userpage.css'
})
export class Userpage implements OnInit {
  user: UserDto | null = null;

  userForm: FormGroup;
  isDisabled = true;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ){
    this.userForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      phone: ['']
    })
  }

  ngOnInit() {
      this.usersService.currentUser$.subscribe(user=>{
        this.user = user;

        if(user)
        {
          this.userForm.patchValue({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone
          })
        }
      })
  }

  toggleEditUserInfo() {
    this.isDisabled = !this.isDisabled;
  }
}
