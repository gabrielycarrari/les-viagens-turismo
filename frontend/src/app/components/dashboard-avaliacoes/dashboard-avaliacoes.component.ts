import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../avaliacoes/avaliacao.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Avaliacao } from '../avaliacoes/avaliacao';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarAvaliacaoComponent } from './visualizar-avaliacao/visualizar-avaliacao.component';

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
    private router: Router,
    public dialog: MatDialog
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


  remove(avaliacaoId: number) {
    this.service.remove(avaliacaoId).subscribe({
      next: () => {
        console.log('Avaliação removida com sucesso!');
        this.avaliacoes = this.avaliacoes.filter(avaliacao => avaliacao.id !== avaliacaoId);
      },
      error:(error) => {
        console.error('Erro ao remover avaliação:', error);
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


  openVisualizeDialog(avaliacao:Avaliacao){
    const dialogRef = this.dialog.open(VisualizarAvaliacaoComponent, {
      width: '600px',
      data: avaliacao,
    });
    }
}

