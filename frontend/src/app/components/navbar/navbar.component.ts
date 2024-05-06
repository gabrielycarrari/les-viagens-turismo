import { CommonModule } from '@angular/common';
import { AuthService } from './../autenticacao/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public autenticado$ : Observable<boolean> = this.authService.isLoggedIn();
  public userName$ : Observable<string> = this.authService.getUserName();

  constructor(
    private router: Router,
    private authService: AuthService) {}

  public login() {
    this.router.navigate(['/login']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

}
