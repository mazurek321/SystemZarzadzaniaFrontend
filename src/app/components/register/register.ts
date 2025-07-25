import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['../auth/auth.css', './register.css']
})
export class Register {

    isSending = false;
    isError = false;
    errorMessage: string = ""
    

    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private cd: ChangeDetectorRef){
      this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['']
    });  
  }
  
  submit()
  {
    this.isSending = true;
    this.isError = false;
    this.errorMessage = '';

    if(this.registerForm.valid)
      {
      this.auth.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/sign-in']); 
          this.isSending = false; 
        },
        error:(err) => {
          this.isSending = false;
          this.isError = true;

          if (err.error && err.error.errors && err.error.errors.ConfirmPassword) {
            this.errorMessage = err.error.errors.ConfirmPassword[0];
          } else {
            this.errorMessage = 'Register failed. Please try again.';
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
