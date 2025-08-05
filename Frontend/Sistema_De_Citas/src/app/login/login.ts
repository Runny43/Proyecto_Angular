import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService,User } from '../services/user-service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  NewUser : User = {
    id: 0,
    user_name: ' ',
    email: '',
    password: '',
    user_role: 'Usuario'
  };


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
    this.userService.GetUsers().subscribe((data: any) => {
      console.log(data);
      this.NewUser = data;
    });

  };


  LoginUser() {
    this.userService.Login(this.NewUser).subscribe((data: any) => {
      console.log(data);
      alert('Inicio de sesión exitoso');
      // Aquí podrías redirigir al usuario a otra página después del inicio de sesión
      this.router.navigate(['/home']);
    }, (error: any) => {
      console.error(error);
      alert('Error al iniciar sesión');
    });



  }
}
