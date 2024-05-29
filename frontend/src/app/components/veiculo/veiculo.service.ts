import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';
import { Veiculo } from './veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private readonly API = 'api/veiculos';

  constructor(private http: HttpClient) { }


  getByCompanhiaTransporteId(id: number): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.API}/companhia/${id}`).pipe(first());
  }

}
