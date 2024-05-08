import { Router } from '@angular/router';
import { AuthService } from './../autenticacao/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/cliente';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-clientes.component.html',
  styleUrl: './dashboard-clientes.component.scss'
})
export class DashboardClientesComponent implements OnInit {
  constructor(
    private service: ClienteService,
    private authService : AuthService,
    private router: Router
  ) { }

  clientes: Cliente[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log("Clientes recebidos:", clientes);
      },
      error: (error) => {
        console.error('Erro ao buscar clientes', error);
        alert('Erro ao buscar clientes: ' + error.message);
      }
    });
  }


  remove(clienteId: number) {
    this.service.remove(clienteId).subscribe({
      next: () => {
        console.log('Cliente removido com sucesso!');
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
      },
      error:(error) => {
        console.error('Erro ao remover cliente:', error);
      }

    }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
}
