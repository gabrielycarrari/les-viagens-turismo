import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'api/clientes';



  constructor(private http: HttpClient) { }

  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API}`).pipe(
      first()
    );
  }

  save(record: Partial<Cliente>) {
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  login(record: Partial<Cliente>){
    return this.http.post(`${this.API}/login`, record).pipe(first());
  }

  private create(record: Partial<Cliente>) {
    return this.http.post<Cliente>(this.API, record).pipe(first());
  }

  private update(record: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.API}/${id}`).pipe(
      tap(() => console.log('Cliente removido com sucesso')),
      catchError(error => {
        console.error('Erro ao remover cliente:', error);
        throw error;
      })
    );
  }
}
