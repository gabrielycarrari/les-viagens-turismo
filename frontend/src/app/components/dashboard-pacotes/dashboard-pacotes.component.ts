import { Component, OnInit } from '@angular/core';
import { PacoteService } from '../pacotes/pacote/pacote.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Pacote } from '../pacotes/pacote/pacote';

@Component({
  selector: 'app-dashboard-pacotes',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-pacotes.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardPacotesComponent implements OnInit {
  constructor(
    private service: PacoteService,
    private authService : AuthService,
    private router: Router
  ) { }


  pacotes: Pacote[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (pacotes) => {
        this.pacotes = pacotes;
        console.log("Pacotes recebidos:", pacotes);
      },
      error: (error) => {
        console.error('Erro ao buscar pacotes', error);
        alert('Erro ao buscar pacotes: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

}

