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

@Component({
  selector: 'app-dashboard-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboard-user.html',
  styles: './dasboard-user.ts'
})
export class DashboardUserComponent {
  activeSection: string = 'proxima-cita';
  servicios: any;
  selectedServicio?: Servicios;

  constructor(private serviciosService: ServiciosServices, private quoteServices:QuotesServices) {}

  private router = inject(Router);
  private authService = inject(Authservice);

  emailUsuario: string = '';
  private userDataService = inject(UserService);

    user : TokenPayload | null = null;
    userData:any;
    quoteData:any;
    serviciosData:any;
    
  ngOnInit() {
  const tokenData = this.authService.getUserData();
  console.log( tokenData);

   this.emailUsuario = this.userDataService.getEmail();
   this.userDataService.GetUser(this.emailUsuario)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.userData = data;
        }
      );

    
      this.serviciosService.getServicios()
      .subscribe(
        (data: any) => {
          console.log(data)
          this.serviciosData = data;
        }
      );
}
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout(event: Event) {
    event.preventDefault();
    console.log('Usuario cerrado sesión');
  }

  cargarServicios() {
    this.serviciosService.getServicios()
      .subscribe(data => this.servicios = data);
  }

  agendarCita(fecha: string, hora: string) {
    if (!this.selectedServicio) return alert('Seleccione un servicio');
    console.log('Agendando cita', this.selectedServicio, fecha, hora);
    
  }

  cancelarCita(id: number) {
    this.quoteServices.deleteQuotes(id).subscribe(() => {
      console.log('Cita eliminada');
      this.cargarServicios();
    });
  }

  reprogramarCita(cita: any) {
    console.log('Reprogramando cita', cita);
     }
}