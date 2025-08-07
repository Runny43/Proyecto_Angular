import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user-service';
import { RouterLink } from '@angular/router';
 
@Component({
  standalone: true,
  selector: 'app-sing-up',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sing-up.html',
  styleUrl: './sing-up.css',
})
export class SingUp {
  private fb = inject(FormBuilder);
  private api = inject(UserService);
 
  newUser = this.fb.group({
    user_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    user_role: ['', Validators.required],
  });
 
  SaveUser() {
    this.api.SaveUser(this.newUser.value).subscribe({
      next: (res) => {
        alert('Usuario guardado correctamente');
        this.newUser.reset();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}