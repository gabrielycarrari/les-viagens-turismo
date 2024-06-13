import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CompanhiaTransporte } from '../../companhiaTransporte/companhiaTransporte';
import { VeiculoService } from '../../veiculo/veiculo.service';
import { Veiculo } from '../../veiculo/veiculo';

@Component({
  selector: 'app-visualizar-companhia-de-transporte',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatListModule,CommonModule,MatChipsModule],
  templateUrl: './visualizar-companhia-de-transporte.component.html',
  styleUrl: './visualizar-companhia-de-transporte.component.scss'
})
export class VisualizarCompanhiaDeTransporteComponent {
  constructor(public dialogRef: MatDialogRef<VisualizarCompanhiaDeTransporteComponent> , @Inject(MAT_DIALOG_DATA) public data: CompanhiaTransporte,
                private serviceVeiculo: VeiculoService) {}

  veiculos: Veiculo[] = [];


  sair(): void {
    this.dialogRef.close(false);
  }


  ngOnInit() {
    this.listarVeiculosPorCompanhia(this.data.id);
  }

  listarVeiculosPorCompanhia( idCompanhia:any): void {
    this.serviceVeiculo.getByCompanhiaTransporteId(idCompanhia).subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
        console.log("Veiculos recebidos:", veiculos);
      },
      error: (error) => {
        console.error('Erro ao buscar os veiculos', error);
        alert('Erro ao buscar os veiculos ' + error.message);
      }
    });
  }


}
