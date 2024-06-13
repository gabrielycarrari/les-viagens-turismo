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

  getById(id: number): Observable<Pacote> {
    return this.http.get<Pacote>(`${this.API}/${id}`).pipe(first());
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

  save(record: Partial<Pacote>) {
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Pacote>) {
    return this.http.post<Pacote>(this.API, record).pipe(first());
  }

  private update(record: Partial<Pacote>) {
    return this.http.put<Pacote>(`${this.API}/${record.id}`, record).pipe(first());
  }

}
