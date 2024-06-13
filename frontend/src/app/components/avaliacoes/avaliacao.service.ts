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

  listByPacote(id:number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.API}/pacote/${id}`).pipe(
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

  getAvaliacaoByPacoteAndCliente(pacoteId: number, clienteId: number): Observable<Avaliacao> {
    console.log("entrou aq")
    return this.http.get<Avaliacao>(`${this.API}/pacote/${pacoteId}/cliente/${clienteId}`).pipe(
      first()
    );
  }

  save(record: Partial<Avaliacao>) {
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Avaliacao>) {
    return this.http.post<Avaliacao>(this.API, record).pipe(first());
  }

  private update(record: Partial<Avaliacao>) {
    return this.http.put<Avaliacao>(`${this.API}/${record.id}`, record).pipe(first());
  }

}
