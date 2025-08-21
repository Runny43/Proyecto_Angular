import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quotes } from '../../models/Quotes';

export interface QuotePayload {
  id: number;
  title: string;
  quote_description: string;
  quote_date: string; // Formato de fecha ISO
  time: string; // Formato de hora HH:mm
  serviciosId: number; // ID del servicio asociado
  usersId: number; // ID del usuario asociado
  quote_state: string; // Estado de la cita (Pendiente, Atendida, Cancelada)
}




@Injectable({
  providedIn: 'root'
})

export class QuotesServices {

  private http = inject(HttpClient);

    getQuotes(){
      return this.http.get('https://localhost:7175/api/Quotes');

    }
    deleteQuotes(Id:number){
      return this.http.delete('https://localhost:7175/api/Quotes/'+Id)

    }
    postQuotes(quote: Quotes): Observable<Quotes>{
      return this.http.post<Quotes>('https://localhost:7175/api/Quotes', quote)
    }

    SaveQuote(quote: any): Observable<any> {
      return this.http.post('https://localhost:7175/api/Quotes/NewQuoteClient', quote);
    }
    
    updateQuote(id: number,quote: any) {
      return this.http.put(`https://localhost:7175/api/Quotes/NewPutQuote/${id}`, quote);
    }


}
