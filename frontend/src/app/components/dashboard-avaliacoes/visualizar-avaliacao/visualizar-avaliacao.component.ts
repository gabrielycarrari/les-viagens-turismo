import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizarPacotesComponent } from '../../dashboard-pacotes/visualizar-pacotes/visualizar-pacotes.component';
import { Pacote } from '../../pacotes/pacote/pacote';
import { Reserva } from '../../reservas/reserva';
import { Avaliacao } from '../../avaliacoes/avaliacao';

@Component({
  selector: 'app-visualizar-avaliacao',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule ,MatExpansionModule, MatIconModule,MatTabsModule],
  templateUrl: './visualizar-avaliacao.component.html',
  styleUrl: './visualizar-avaliacao.component.scss'
})
export class VisualizarAvaliacaoComponent {

  constructor(public dialogRef: MatDialogRef<VisualizarPacotesComponent> , @Inject(MAT_DIALOG_DATA) public data: Avaliacao,public dialog: MatDialog) {}

  sair(): void {
    this.dialogRef.close(false);
  }

  openVisualizePacoteDialog(pacote:Pacote){
    const dialogRef = this.dialog.open(VisualizarPacotesComponent, {
      width: '700px',
      data: pacote,
    });
    }
}
