import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
