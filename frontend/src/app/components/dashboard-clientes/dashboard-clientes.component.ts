import { Router } from '@angular/router';
import { AuthService } from './../autenticacao/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from '../cliente/cliente';
import { NavbarFuncionarioComponent } from '../navbar-funcionario/navbar-funcionario.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';

@Component({
  selector: 'app-dashboard-clientes',
  standalone: true,
  imports: [ NavbarFuncionarioComponent],
  templateUrl: './dashboard-clientes.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardClientesComponent implements OnInit {
  constructor(
    private service: ClienteService,
    private authService : AuthService,
    private router: Router,
    public dialog: MatDialog
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


  openConfirmDialog(id: number, nome :String, info : String){
    const dialogRef = this.dialog.open(DialogDeletarComponent, {
      width: '250px',
      data: {nome, info },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(id);
      }
    });
  }
}
