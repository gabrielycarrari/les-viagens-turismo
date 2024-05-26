import { CompanhiaTransporte } from './companhiaTransporte';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanhiaTransporteService {

  private readonly API = 'api/companhiasTransporte';


  constructor(private http: HttpClient) { }

  list(): Observable<CompanhiaTransporte[]> {
    return this.http.get<CompanhiaTransporte[]>(`${this.API}`).pipe(
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
