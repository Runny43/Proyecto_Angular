import { Component, inject } from '@angular/core';
import { TokenPayload, Authservice} from '../services/authServices/authservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiciosServices,ServicioPayload } from '../services/serviciosServices/servicios';


@Component({
  standalone: true,
  selector: 'app-dasboard-user',
  imports: [CommonModule],
  templateUrl: './dasboard-user.html',
  styleUrl: './dasboard-user.css'
})
export class DasboardUser {
  private router = inject(Router);
  private authService = inject(Authservice);
  private serviciosService = inject(ServiciosServices);

  activeSection: string = 'proxima-cita';
  user : TokenPayload | null = null;
  servicio : ServicioPayload[] = [];
  

  //Funciones de login y logout

  ngOnInit() {
    this.user = this.authService.getUserData();
    this.cargarServicios();
    
    }

  
  logout(event: Event) {
    event.preventDefault(); // evita que el enlace recargue la página
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

   setActiveSection(section: string) {
    this.activeSection = section;
  }

 
  // Funciones para servicio
 
 cargarServicios() {
    this.serviciosService.getServicios().subscribe({
      next: (res) => {
        this.servicio = res as ServicioPayload[];
        console.log('Servicios recibidos:', this.servicio);
      },
      error: (err) => console.error('Error al obtener servicios:', err)
    });
  }
  

}
