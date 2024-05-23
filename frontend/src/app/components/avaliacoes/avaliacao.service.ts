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

}
