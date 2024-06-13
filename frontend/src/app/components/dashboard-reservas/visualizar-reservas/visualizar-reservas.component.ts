import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizarPacotesComponent } from '../../dashboard-pacotes/visualizar-pacotes/visualizar-pacotes.component';
import { Reserva } from '../../reservas/reserva';
import { Pacote } from '../../pacotes/pacote/pacote';

@Component({
  selector: 'app-visualizar-reservas',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule ,MatExpansionModule, MatIconModule,MatTabsModule],
  templateUrl: './visualizar-reservas.component.html',
  styleUrl: './visualizar-reservas.component.scss'
})
export class VisualizarReservasComponent {

  constructor(public dialogRef: MatDialogRef<VisualizarPacotesComponent> , @Inject(MAT_DIALOG_DATA) public data: Reserva,public dialog: MatDialog) {}

  sair(): void {
    this.dialogRef.close(false);
  }


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  panelOpenState = false;

  openVisualizePacoteDialog(pacote:Pacote){
    const dialogRef = this.dialog.open(VisualizarPacotesComponent, {
      width: '700px',
      data: pacote,
    });
    }
}
