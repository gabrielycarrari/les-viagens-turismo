import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Avaliacao } from './avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private readonly API = 'api/avaliacoes';


  constructor(private http: HttpClient) { }

  list(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.API}`).pipe(
      first()
    );
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.API}/${id}`).pipe(
      tap(() => console.log('Companhia de Transporte removida com sucesso')),
      catchError(error => {
        console.error('Erro ao remover Companhia de Transporte:', error);
        throw error;
      })
    );
  }


}
