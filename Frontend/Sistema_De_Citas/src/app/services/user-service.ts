import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
export interface User {
  user_name: string;
  email: string;
  password: string;
  user_role: string;
}
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi = 'https://localhost:7175/api/Users';
  private http = inject(HttpClient);
 
  GetUsers() {
    return this.http.get(this.urlApi);
  }
  GetUser(id: number) {
    return this.http.get(`${this.urlApi}/${id}`);
  }
 
  SaveUser(user: any) {
    return this.http.post(this.urlApi, user);
  }
 
  Login(user: any) {
    return this.http.post(`${this.urlApi}/Login`, user);
  }
 
  DeleteUser(id: number) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}