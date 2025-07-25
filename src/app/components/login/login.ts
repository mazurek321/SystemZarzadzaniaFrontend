import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { UsersService } from '../../services/users/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['../auth/auth.css','./login.css']
})
export class Login {

  isSending = false;
  isError = false;
  errorMessage: string = ""

  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private cd: ChangeDetectorRef,
  ){
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: ['']
  });
  }

  submit()
  {
    this.isSending = true;
    this.isError = false;
    this.errorMessage = '';

    const {email, password, rememberMe} = this.loginForm.value;

    if(this.loginForm.valid)
      {
      this.auth.login(email, password, rememberMe).pipe(
        switchMap(()=>this.auth.usersService.getCurrentUsersData())
      ).subscribe({
        next: () => {
          this.router.navigate(['/home']); 
          this.isSending = false; 
          this.isError = false;
        },
        error:(err) => {
          this.isSending = false; 
          this.isError = true;

          if (err.error) {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }

          this.cd.detectChanges();

        }
      });
    }
    else
    {
      this.isSending = false; 
      this.isError = true;
      this.errorMessage = 'You need to fill all required fields.';
    }
  }
}
