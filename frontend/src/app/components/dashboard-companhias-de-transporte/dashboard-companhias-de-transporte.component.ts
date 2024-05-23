import { Router } from '@angular/router';
import { AuthService } from './../autenticacao/auth.service';
import { Component, OnInit } from '@angular/core';
import { CompanhiaTransporteService } from '../companhiaTransporte/companhiaTransporte.service';
import { CompanhiaTransporte } from '../companhiaTransporte/companhiaTransporte';

@Component({
  selector: 'app-dashboard-companhias-de-transporte',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-companhias-de-transporte.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardCompanhiasDeTransporteComponent implements OnInit {
  constructor(
    private service: CompanhiaTransporteService,
    private authService : AuthService,
    private router: Router
  ) { }

  companhiasTransporte: CompanhiaTransporte[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (companhiasTransporte) => {
        this.companhiasTransporte = companhiasTransporte;
        console.log("Companhias de Transporte recebidos:", companhiasTransporte);
      },
      error: (error) => {
        console.error('Erro ao buscar companhias de transporte', error);
        alert('Erro ao buscar companhias de transporte: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
}
