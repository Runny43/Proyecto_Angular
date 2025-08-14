import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TokenPayload, Authservice } from '../services/authServices/authservice';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { QuotesServices } from '../services/quotesServices/quotes';
import { ServiciosServices } from '../services/serviciosServices/servicios';
import { FormsModule } from '@angular/forms';
import { Servicios } from '../models/Servicios';
import { Users } from '../models/Users';
import { Quotes } from '../models/Quotes';
@Component({
  standalone: true,
  selector: 'app-dasboard-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboard-admin.html',
  styleUrl: './dasboard-admin.css'
})
export class DasboardAdmin {
  constructor(private userService: UserService, private quotesService:QuotesServices, private serviciosServices:ServiciosServices) {
    }

    borrarServicio(id:number){
      this.serviciosServices.deleteServicios(id)
      .subscribe({
        next: (res) => console.log('Quote', res),
            error: (err) => console.error('Error al crear tarea:', err)
      })
    }
  borrarQuote(id:number) {
  this.quotesService.deleteQuotes(id)
        .subscribe({
            next: (res) => console.log('Borrar cita', res),
            error: (err) => console.error('Error al crear tarea:', err)
          }
        );
}
  private router = inject(Router);
  private authService = inject(Authservice);

  emailUsuario: string = '';
  private userDataService = inject(UserService);

    activeSection: string = 'proxima-cita';
    user : TokenPayload | null = null;
    userData:any;
    quoteData:any;
    serviciosData:any;
    
  ngOnInit() {
  const tokenData = this.authService.getUserData();
  console.log( tokenData);

   this.emailUsuario = this.userDataService.getEmail();
   this.userService.GetUser(this.emailUsuario)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.userData = data;
        }
      );

    this.quotesService.getQuotes()
      .subscribe(
        (data: any) => {
          console.log(data)
          this.quoteData = data;
        }
      );
      this.serviciosServices.getServicios()
      .subscribe(
        (data: any) => {
          console.log(data)
          this.serviciosData = data;
        }
      );
}
  loggedUser: Users= new Users(0,'','','','');
  editUser(){
    
    
    this.userService.putUser(this.loggedUser).subscribe({
      next:(res) => console.log('Usuario editado:', res),
      error: (err) => console.error('Error al editar usuario:', err)
    }
  );
  }
  

  logout(event: Event) {
    event.preventDefault(); // evita que el enlace recargue la página
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }


  setActiveSection(section: string) {
    this.activeSection = section;
  }

  servicios: Servicios = new Servicios(0, '', '', '', 0);
  crearServicio() {
    this.serviciosServices.postServicios(this.servicios)
    .subscribe({
      next:(res) => console.log('Servicio creado:', res),
      error: (err) => console.error('Error al crear servicio:', err)
    }
  );
  }

  quotes: Quotes= new Quotes(0, '', '', new Date(), '', 0, 0);
  crearCita() {
    this.quotes.usersId = this.userData.id;
    this.quotesService.postQuotes(this.quotes)
    .subscribe({
      next:(res) => console.log('Cita creada:', res),
      error: (err) => console.error('Error al crear servicio:', err)
    }
  );
  }


}
