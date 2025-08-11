import { Component, inject } from '@angular/core';
import { TokenPayload, Authservice} from '../services/authServices/authservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


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

  activeSection: string = 'proxima-cita';
  user : TokenPayload | null = null;


  ngOnInit() {
    this.user = this.authService.getUserData();
    
    }
  
  logout(event: Event) {
    event.preventDefault(); // evita que el enlace recargue la página
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

   setActiveSection(section: string) {
    this.activeSection = section;
  }

}
