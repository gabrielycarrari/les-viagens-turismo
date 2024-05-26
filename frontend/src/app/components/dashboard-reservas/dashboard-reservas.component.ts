import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reservas/reserva.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Reserva } from '../reservas/reserva';

@Component({
  selector: 'app-dashboard-reservas',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-reservas.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardReservasComponent  implements OnInit {
  constructor(
    private service: ReservaService,
    private authService : AuthService,
    private router: Router
  ) { }


  reservas: Reserva[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
        console.log("Reservas recebidas:", reservas);
      },
      error: (error) => {
        console.error('Erro ao buscar reservas', error);
        alert('Erro ao buscar reservas: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

}

