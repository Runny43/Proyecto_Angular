import { Injectable } from '@angular/core';

export interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})


export class Authservice {
  
  private tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): TokenPayload | null {
    const token = this.getToken();
    if (!token) { return null; }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    }
    catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {

    const data = this.getUserData();
    if (!data) { return false; }

    const now = Math.floor(Date.now() / 1000);
    return data.exp > now;
  }


  logout() {

    localStorage.removeItem(this.tokenKey);
    console.log('User logged out');
  }
  

}
