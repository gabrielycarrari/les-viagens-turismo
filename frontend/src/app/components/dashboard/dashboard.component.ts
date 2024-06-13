import { Component } from '@angular/core';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente/cliente.service';
import { ReservaService } from '../reservas/reserva.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  ganhoTotal: number = 0.00;
  totalClientes: number = 0;

  constructor(
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarTotalClientes();
    this.carregarGanhoTotal();
  }

  carregarTotalClientes(){
    this.clienteService.getTotalClientes().subscribe({
      next: (total) => {
        this.totalClientes = total;
      },
      error: (error) => {
        this.totalClientes = 0;
        alert('Erro ao buscar o total de clientes: ' + error.message);
      }
    });
  }

  carregarGanhoTotal(){
    this.reservaService.getGanhoTotal().subscribe({
      next: (total) => {
        this.ganhoTotal = total;
      },
      error: (error) => {
        this.totalClientes = 0;
        alert('Erro ao buscar o ganho total: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
}
