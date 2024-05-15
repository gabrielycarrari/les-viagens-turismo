import { Component, OnInit } from '@angular/core';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { Funcionario } from '../funcionario/funcionario';

@Component({
  selector: 'app-dashboard-funcionarios',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrl: './dashboard-funcionarios.component.scss'
})
export class DashboardFuncionariosComponent implements OnInit {
  constructor(
    private service: FuncionarioService,
    private authService : AuthService,
    private router: Router
  ) { }

  funcionarios: Funcionario[] = [];

  ngOnInit() {
    this.listar();
  }


  listar(): void {
    this.service.list().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
        console.log("Funcionarios recebidos:", funcionarios);
      },
      error: (error) => {
        console.error('Erro ao buscar funcionarios', error);
        alert('Erro ao buscar funcionarios: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
}
