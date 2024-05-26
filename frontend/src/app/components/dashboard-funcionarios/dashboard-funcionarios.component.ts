import { Component, OnInit } from '@angular/core';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { Funcionario } from '../funcionario/funcionario';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';

@Component({
  selector: 'app-dashboard-funcionarios',
  standalone: true,
  imports: [DialogDeletarComponent],
  templateUrl: './dashboard-funcionarios.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardFuncionariosComponent implements OnInit {
  constructor(
    private service: FuncionarioService,
    private authService : AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }



  funcionarios: Funcionario[] = [];

  ngOnInit() {
    this.listar();
  }

  remove(funcionarioId: number) {
    this.service.remove(funcionarioId).subscribe({
      next: () => {
        console.log('Funcionario removido com sucesso!');
        this.funcionarios = this.funcionarios.filter(funcionario => funcionario.id !== funcionarioId);
      },
      error:(error) => {
        console.error('Erro ao remover Funcionario:', error);
      }

    }
    );
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

    openConfirmDialog(id: number, nome :String, info : String){
      const dialogRef = this.dialog.open(DialogDeletarComponent, {
        width: '350px',
        data: {nome, info },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.remove(id);
        }
      });
    }

}
