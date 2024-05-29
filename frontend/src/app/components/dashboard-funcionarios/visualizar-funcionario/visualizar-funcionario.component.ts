import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-visualizar-funcionario',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule],
  templateUrl: './visualizar-funcionario.component.html',
  styleUrl: './visualizar-funcionario.component.scss'
})
export class VisualizarFuncionarioComponent {
  constructor(public dialogRef: MatDialogRef<VisualizarFuncionarioComponent> , @Inject(MAT_DIALOG_DATA) public data: any,) {}

  sair(): void {
    this.dialogRef.close(false);
  }
}
