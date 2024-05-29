import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Pacote } from '../../pacotes/pacote/pacote';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-visualizar-pacotes',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule ,MatExpansionModule, MatIconModule,MatTabsModule],
  templateUrl: './visualizar-pacotes.component.html',
  styleUrl: './visualizar-pacotes.component.scss'
})
export class VisualizarPacotesComponent {
  constructor(public dialogRef: MatDialogRef<VisualizarPacotesComponent> , @Inject(MAT_DIALOG_DATA) public data: Pacote,) {}

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
}
