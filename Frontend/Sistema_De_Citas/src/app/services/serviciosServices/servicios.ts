import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosServices {
  constructor(private http:HttpClient) {}
  getServicios(){
    return this.http.get('https://localhost:7175/api/Servicios');
  }
}
