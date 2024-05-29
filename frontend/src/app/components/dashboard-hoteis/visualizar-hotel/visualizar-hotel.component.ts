import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { Hotel } from '../../hotel/hotel';

@Component({
  selector: 'app-visualizar-hotel',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule,MatChipsModule],
  templateUrl: './visualizar-hotel.component.html',
  styleUrl: './visualizar-hotel.component.scss'
})
export class VisualizarHotelComponent {
  constructor(public dialogRef: MatDialogRef<VisualizarHotelComponent> , @Inject(MAT_DIALOG_DATA) public data: Hotel,) {}

  sair(): void {
    this.dialogRef.close(false);
  }
}
