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
import { Authservice, TokenPayload } from '../services/authServices/authservice';


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
  private auth = inject(Authservice);
 private userDataService = inject(UserService);

  newUser: FormGroup<{ email: FormControl<string | null>, password: FormControl<string | null> }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  
  LoginUser() {
    this.api.Login(this.newUser.value).subscribe({
      next: (res) => {
        alert('sign in');
      
        localStorage.setItem('token', res.token);
        console.log(res.token);
        
        const tokenPayload = this.auth.getUserData();
        const emailValue = this.newUser.get('email')?.value || '';
        this.userDataService.setEmail(emailValue);
        
        if(tokenPayload?.role === 'usuario'){
          this.router.navigate(['/dasboard-user']);
        }else{
          this.router.navigate(['/dasboard-admin']);
        }
      },
      
      error: (err) => console.error(err),
    });
  }
}