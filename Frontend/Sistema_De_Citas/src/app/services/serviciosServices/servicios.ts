import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios } from '../../models/Servicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosServices {
  constructor(private http:HttpClient) {}
  
  getServicios(){
    return this.http.get('https://localhost:7175/api/Servicios');
  }
  deleteServicios(Id:any){
    return this.http.delete('https://localhost:7175/api/Servicios/'+Id)
  }
  postServicios(servicio: Servicios): Observable<Servicios>{
    return this.http.post<Servicios>('https://localhost:7175/api/Servicios', servicio)
  }
}
