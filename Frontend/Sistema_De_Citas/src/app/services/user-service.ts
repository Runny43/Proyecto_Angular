import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/Users';

interface User {
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
  GetUser(email: string) {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get(`${this.urlApi}/${encodedEmail}`);
  }
  putUser(loggedUser: Users): Observable<Users>{
    return this.http.put<Users>( `https://localhost:7175/api/Users/${loggedUser.id}`,loggedUser)
  }
  SaveUser(user: any): Observable<any> {
    return this.http.post(this.urlApi, user);
  }
 
  Login(user: any): Observable<any> {
    return this.http.post(`${this.urlApi}/Login`, user);
  }
 
  DeleteUser(id: number) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  private email: string = '';

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}