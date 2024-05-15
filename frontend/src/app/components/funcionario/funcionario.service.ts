import { Funcionario } from './funcionario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = 'api/funcionarios';


  constructor(private http: HttpClient) { }

  list(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}`).pipe(
      first()
    );
  }

}
