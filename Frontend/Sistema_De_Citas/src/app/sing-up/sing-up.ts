import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService,User } from '../services/user-service';
import { RouterLink,RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-sing-up',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './sing-up.html',
  styleUrl: './sing-up.css'
})
export class SingUp implements OnInit {


    NewUser : User = {
    user_name: '',
    email: '',
    password: '',
    user_role: 'Usuario'
  };

  constructor(private userService: UserService) { }

   ngOnInit(): void {
    
    this.userService.GetUsers().subscribe((data: any) => {
      console.log(data);
      this.NewUser = data;
    });

  }

  SaveUser() {
     console.log('Datos enviados al backend:', this.NewUser);
     this.userService.SaveUser(this.NewUser).subscribe({
      next: () => {
        console.log('Usuario guardado correctamente',this.NewUser);
        alert('Usuario guardado correctamente');
        this.NewUser = {
          id: 0,
          user_name: '',
          email: '',
          password: '',
          user_role: 'Usuario'
        }
      
      },
      error: (error: any) => {
        console.error(error);
        alert('Error al guardar el usuario');
      }
    });

  }


}
