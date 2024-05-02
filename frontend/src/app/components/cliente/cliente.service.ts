import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'api/clientes';

  constructor(private http: HttpClient) { }

  list(page = 0, pageSize = 10) {
    return this.http.get<Cliente[]>(this.API).pipe(
      first(),
      // map(data => data.courses),
      // tap(data => (this.cache = data.courses))
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

}
