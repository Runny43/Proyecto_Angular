import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotes } from '../../models/Quotes';

@Injectable({
  providedIn: 'root'
})
export class QuotesServices {
  constructor(private http:HttpClient) {}
    getQuotes(){
      return this.http.get('https://localhost:7175/api/Quotes');
    }
    deleteQuotes(Id:number){
      return this.http.delete('https://localhost:7175/api/Quotes/'+Id)
    }
    postQuotes(quote: Quotes): Observable<Quotes>{
      return this.http.post<Quotes>('https://localhost:7175/api/Quotes', quote)
    }
}
