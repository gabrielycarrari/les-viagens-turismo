import { Funcionario } from './funcionario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly APIComplete = 'localhost:8080/api/funcionarios';
  private readonly API = 'api/funcionarios';


  constructor(private http: HttpClient) { }

  list(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}`).pipe(
      first()
    );
  }

  getById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/${id}`).pipe(first());
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.API}/${id}`).pipe(
      tap(() => console.log('Funcionario removido com sucesso')),
      catchError(error => {
        console.error('Erro ao remover funcionario:', error);
        throw error;
      })
    );
  }

  save(record: Partial<Funcionario>) {
    if (record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Funcionario>) {
    return this.http.post<Funcionario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Funcionario>) {
    return this.http.put<Funcionario>(`${this.API}/${record.id}`, record).pipe(first());
  }

  login(record: Partial<Funcionario>){
    return this.http.post(`${this.API}/login`, record).pipe(first());
  }

  alterarSenha(record: any){
    return this.http.post(`${this.API}/alterarSenha`, record).pipe(first());
  }

}
