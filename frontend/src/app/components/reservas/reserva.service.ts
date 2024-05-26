import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private readonly API = 'api/reservas';



  constructor(private http: HttpClient) { }

  list(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.API}`).pipe(
      first()
    );
  }



  remove(id: number) {
    return this.http.delete<any>(`${this.API}/${id}`).pipe(
      tap(() => console.log('Pacote removido com sucesso')),
      catchError(error => {
        console.error('Erro ao remover Pacote:', error);
        throw error;
      })
    );
  }

}
