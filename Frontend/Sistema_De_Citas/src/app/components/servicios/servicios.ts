import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosServices } from '../../services/serviciosServices/servicios';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios implements OnInit {
  constructor(private serviciosService: ServiciosServices) {
  }
  serviciosLista: any;
  ngOnInit(): void {
    this.serviciosService.getServicios()
      .subscribe(
        (data: any) => {
          console.log(data)
          this.serviciosLista = data;
        }
      );

  }
}
