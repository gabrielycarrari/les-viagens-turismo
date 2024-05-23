import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacoes/avaliacao.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Avaliacao } from '../avaliacoes/avaliacao';

@Component({
  selector: 'app-dashboard-avaliacoes',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-avaliacoes.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardAvaliacoesComponent implements OnInit {
  constructor(
    private service: AvaliacaoService,
    private authService : AuthService,
    private router: Router
  ) { }


  avaliacoes: Avaliacao[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
        console.log("Avaliações recebidas:", avaliacoes);
      },
      error: (error) => {
        console.error('Erro ao buscar avaliações', error);
        alert('Erro ao buscar avaliações: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

}

