import { Component, OnInit } from '@angular/core';
import { UserDto, UsersService } from '../../services/users/users';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userpage',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userpage.html',
  styleUrl: './userpage.css'
})
export class Userpage implements OnInit {
  user: UserDto | null = null;

  loggedInUserId: string | null = null;

  userForm: FormGroup;
  isDisabled = true;
  isOwnProfile = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){
    this.userForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      phone: ['']
    })
  }

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      this.usersService.getUser(routeId).subscribe(user => {
        this.setUser(user);
        this.usersService.currentUser$.subscribe(current => {
          this.isOwnProfile = current?.id === user.id;
        });
      });
    } else {
      this.usersService.currentUser$.subscribe(user => {
        this.setUser(user);
        this.isOwnProfile = true;
      });
    }
  }

  toggleEditUserInfo() {
    if (this.route.snapshot.paramMap.get('id')) return;

    this.isDisabled = !this.isDisabled;

    if (this.isDisabled) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

    private setUser(user: UserDto | null) {
    this.user = user;

    if (user) {
      this.userForm.patchValue({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone
      });
      this.userForm.disable();
      this.isDisabled = true;
    }
  }

  saveUser()
  {
    if(!this.user) return;

    if(this.userForm.invalid) {console.warn("Invalid form."); return;}
  
    const updatedData = this.userForm.value;

    this.usersService.updateUser(updatedData).subscribe({
      next: updatedUser => {
        this.setUser(updatedUser);
        this.isDisabled = true;
        this.userForm.disable();
        alert('Profil został zaktualizowany!');
      },
      error: err => {
        console.error('Błąd podczas aktualizacji:', err);
        alert('Nie udało się zaktualizować profilu.');
      }
    });
  }

  cancelEdit()
  {
    if(!this.user) return;
    this.userForm.patchValue({
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email,
      phone: this.user.phone
    });

    this.isDisabled = true;
    this.userForm.disable();
  }

  
  
}
