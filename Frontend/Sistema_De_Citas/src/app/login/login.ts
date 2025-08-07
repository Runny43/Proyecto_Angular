import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService, User } from '../services/user-service';
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
    user_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    user_role: ['', Validators.required],
  });
 
  LoginUser() {
    this.api.Login(this.newUser.value).subscribe({
      next: (res) => {
        alert('sign in');
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    });
  }
}