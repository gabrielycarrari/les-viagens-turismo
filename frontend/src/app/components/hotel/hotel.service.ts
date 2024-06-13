import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly API = 'api/hoteis';

  constructor(private http: HttpClient) { }

  list(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.API}`).pipe(
      first()
    );
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.API}/${id}`).pipe(
      tap(() => console.log('Hotel removido com sucesso')),
      catchError(error => {
        console.error('Erro ao remover hotel:', error);
        throw error;
      })
    );
  }

  getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Partial<Hotel>) {
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Hotel>) {
    return this.http.post<Hotel>(this.API, record).pipe(first());
  }

  private update(record: Partial<Hotel>) {
    return this.http.put<Hotel>(`${this.API}/${record.id}`, record).pipe(first());
  }

}
