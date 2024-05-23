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

}
