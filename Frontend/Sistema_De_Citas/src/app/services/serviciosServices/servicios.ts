import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios } from '../../models/Servicios';

export interface ServicioPayload {
  id: number;
  service_names: string;
  service_description: string;
  duration: number; // en minutos
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosServices {
  constructor(private http:HttpClient) {}
  


  getServicios(){
    return this.http.get('https://localhost:7175/api/Servicios');
  }
  searchServicio(name:any){
    return this.http.get('https://localhost:7175/api/Servicios/'+name)
  }
  deleteServicios(Id:any){
    return this.http.delete('https://localhost:7175/api/Servicios/'+Id)
  }
  postServicios(servicio: Servicios): Observable<Servicios>{
    return this.http.post<Servicios>('https://localhost:7175/api/Servicios', servicio)
  }
}
