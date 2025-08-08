import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user-service';
import { Router, RouterLink } from '@angular/router';
 
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private api = inject(UserService);
  private router = inject(Router);
 
  newUser = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
 

  LoginUser() {
    const { email, password } = this.newUser.value;
    this.api.Login({
      email: email ?? '',
      password: password ?? ''
    }).subscribe({
      next: (res) => {
        alert('sign in');
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    });
  }
}