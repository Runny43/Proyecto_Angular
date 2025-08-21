import { Component, inject,TemplateRef } from '@angular/core';
import { TokenPayload, Authservice} from '../services/authServices/authservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiciosServices,ServicioPayload } from '../services/serviciosServices/servicios';
import { QuotesServices, QuotePayload } from '../services/quotesServices/quotes';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators, } from '@angular/forms';
import { UserService, User} from '../services/user-service';



@Component({
  standalone: true,
  selector: 'app-dasboard-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dasboard-user.html',
  styleUrl: './dasboard-user.css'
})
export class DasboardUser {
  private router = inject(Router);
  private authService = inject(Authservice);
  private serviciosService = inject(ServiciosServices);
  private quotesService = inject(QuotesServices);
  private fb = inject(FormBuilder);
  private userService = inject(UserService)
  

  activeSection: string = 'proxima-cita';
  user : TokenPayload | null = null;
  servicio : ServicioPayload[] = [];
  quotes: QuotePayload[] = [];
  editForm!: FormGroup;
  selectedQuoteId!: number;
  selectedUserId!: number;

  

  newQuote = this.fb.group({

    title: ['', Validators.required],
    quote_description: ['', Validators.required],
    quote_date: ['', Validators.required],
    quote_hora:['', Validators.required],
    quote_state: ['Pendiente', Validators.required],
    usersId: [this.user?.id, Validators.required],
    serviciosId: ['', Validators.required],
  
  });

  UpQuote : any = {
    title: '',
    quote_description: '',
    quote_date: '',
    quote_hora: '',
    serviciosId: Number(''),
  }

  upUser : any = {
    email: '',
    user_name: ''
  }
  

  //Funciones de login y logout

  ngOnInit() {
    this.user = this.authService.getUserData();
    this.cargarServicios();
    this.getQuotes();
    
    this.newQuote = this.fb.group({

    title: ['', Validators.required],
    quote_description: ['', Validators.required],
    quote_date: ['', Validators.required],
    quote_hora:['', Validators.required],
    quote_state: ['Pendiente', Validators.required],
    usersId: [this.user?.id, Validators.required],
    serviciosId: ['', Validators.required],
  

  });

    }

  
  logout(event: Event) {
    event.preventDefault(); // evita que el enlace recargue la p�gina
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

  getQuotes() {
    this.quotesService.getQuotes().subscribe({
      next: (res) => {
        this.quotes = res as QuotePayload[];
        console.log('Quotes recibidos:', this.quotes);
      },
      error: (err) => console.error('Error al obtener quotes:', err)
    });

  }

  saveQuote() {

        if (this.newQuote.valid) {
    const { title, quote_description, quote_date, quote_hora, quote_state, usersId, serviciosId } = this.newQuote.value;

    // Combinar fecha + hora
    const fechaCompleta = `${quote_date}T${quote_hora}:00`;

    // Construir objeto para enviar (sin quote_hora)
    const cita = {
      title,
      quote_description,
      quote_date: fechaCompleta,
      quote_state,
      usersId,
      serviciosId
    };

    

    this.quotesService.SaveQuote(cita).subscribe({
      next: (res) => {
        alert('Cita guardada correctamente');
        this.newQuote.reset();
      },
      error: (error: any) => {
        console.error(error);
      },
    });

  } 
  }

  DeleteQuote(id: number) {
    this.quotesService.deleteQuotes(id).subscribe({
      next: (res) => {
        alert('Cita eliminada correctamente');
        this.getQuotes();
      },
      error: (error: any) => {
        console.error(error);
      },
    });

  }

  EditQuote(quote: QuotePayload) {
    this.selectedQuoteId = quote.id;
     const fecha = quote.quote_date.split('T')[0];      // "2025-08-20"
      const hora = quote.quote_date.split('T')[1].slice(0,5); // "14:30"

  this.UpQuote = {
    title: quote.title,
    quote_description: quote.quote_description,
    quote_date: fecha,
    quote_hora: hora, // este lo usas solo en el form, no se manda al backend
    serviciosId: quote.serviciosId,
    quote_state: quote.quote_state,
    usersId: quote.usersId
  }
}

  UpdateQuote(){

     const fechaCompleta = `${this.UpQuote.quote_date}T${this.UpQuote.quote_hora}:00`;

    const cita = {
    title: this.UpQuote.title,
    quote_description: this.UpQuote.quote_description,
    quote_date: fechaCompleta,
    quote_state: this.UpQuote.quote_state,
    usersId: this.UpQuote.usersId,
    serviciosId: this.UpQuote.serviciosId
    };


    this.quotesService.updateQuote(this.selectedQuoteId, cita).subscribe({
      next: (res) => {
        alert('Cita actualizada correctamente');
        this.getQuotes();
      },
      error: (error: any) => {
        console.error(error);
      },
    });

  }

  EditUser(id: any ,upUser: any){
    this.selectedUserId = id
    this.upUser.user_name = upUser.user_name
    this.upUser.email = upUser.sub
  }

  UpdateUser(){
    this.userService.updateUser(Number(this.selectedUserId),this.upUser).subscribe({
      next: (res) => {
        alert('Cuenta Actulizada');
        this.ngOnInit()
      },
       error: (error: any) => {
        console.error(error);
      },
    })
  }

   

}
