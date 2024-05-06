import { Router } from '@angular/router';
import { AuthService } from './../autenticacao/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-clientes.component.html',
  styleUrl: './dashboard-clientes.component.scss'
})
export class DashboardClientesComponent {

  constructor(
    private authService : AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
}
