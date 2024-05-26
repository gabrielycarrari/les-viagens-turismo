import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Pacote } from './pacote';

@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  private readonly API = 'api/pacotes';



  constructor(private http: HttpClient) { }

  list(): Observable<Pacote[]> {
    return this.http.get<Pacote[]>(`${this.API}`).pipe(
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
