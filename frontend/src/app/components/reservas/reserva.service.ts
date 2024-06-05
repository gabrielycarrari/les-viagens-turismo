import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Reserva } from './reserva';
import { Cliente } from '../cliente/cliente';
import { ReservaDTO } from './reserva.dto';

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

  getReservasByCliente(idCliente: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.API}/cliente/${idCliente}`).pipe(
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

  private create(record: ReservaDTO) {
    return this.http.post<Reserva>(this.API, record).pipe(first());
  }

  save(record: ReservaDTO) {

    return this.create(record);
  }

  getGanhoTotal() {
    return this.http.get<number>(`${this.API}/ganhoTotal`).pipe(first());
  }

}
