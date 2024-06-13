import { Component, OnInit } from '@angular/core';
import { PacoteService } from '../pacotes/pacote/pacote.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Pacote } from '../pacotes/pacote/pacote';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarPacotesComponent } from './visualizar-pacotes/visualizar-pacotes.component';
import { CadastrarPacoteComponent } from './cadastrar-pacote/cadastrar-pacote.component';

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
    private router: Router,
    public dialog: MatDialog
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


  remove(pacoteId: number) {
    this.service.remove(pacoteId).subscribe({
      next: () => {
        console.log('Pacote removido com sucesso!');
        this.pacotes = this.pacotes.filter(pacote => pacote.id !== pacoteId);
      },
      error:(error) => {
        console.error('Erro ao remover Pacote:', error);
      }
    }
    );
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

  openVisualizeDialog(pacote:Pacote){
    const dialogRef = this.dialog.open(VisualizarPacotesComponent, {
      width: '700px',
      data: pacote,
    });
  }

  openCadastroDialog(){
    const dialogRef = this.dialog.open(CadastrarPacoteComponent, {
      data: { titulo: "Cadastrar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        window.location.reload();
      }
    });
  }

  openEdicaoDialog(id: number){
    const dialogRef = this.dialog.open(CadastrarPacoteComponent, {
      data: {
        idPacote: id,
        titulo: "Editar"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        window.location.reload();
      }
    });
  }
}

