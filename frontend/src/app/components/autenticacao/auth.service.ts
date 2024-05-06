// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'api/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap(response => this.saveSession(response.userType, response.name))
      );
  }

  saveSession(userType: string, name: string): void {
    sessionStorage.setItem('userType', userType);
    sessionStorage.setItem('userName', name);
  }

  isLoggedIn(): Observable<boolean> {
    return of(sessionStorage.getItem('userType') !== null);
  }

  getUserType(): string {
    return sessionStorage.getItem('userType') ?? '';
  }

  getUserName(): Observable<string> {
    return of(sessionStorage.getItem('userName') ?? '');
  }

  logout(): void {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userName');
  }
}
