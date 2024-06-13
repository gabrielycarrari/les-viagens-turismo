import { Router } from '@angular/router';
import { AuthService } from './../autenticacao/auth.service';
import { Component, OnInit } from '@angular/core';
import { CompanhiaTransporteService } from '../companhiaTransporte/companhiaTransporte.service';
import { CompanhiaTransporte } from '../companhiaTransporte/companhiaTransporte';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';
import { VisualizarCompanhiaDeTransporteComponent } from './visualizar-companhia-de-transporte/visualizar-companhia-de-transporte.component';
import { CadastrarCompanhiaComponent } from './cadastrar-companhia/cadastrar-companhia.component';

@Component({
  selector: 'app-dashboard-companhias-de-transporte',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-companhias-de-transporte.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardCompanhiasDeTransporteComponent implements OnInit {
  constructor(
    private service: CompanhiaTransporteService,
    private authService : AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  companhiasTransporte: CompanhiaTransporte[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (companhiasTransporte) => {
        this.companhiasTransporte = companhiasTransporte;
        console.log("Companhias de Transporte recebidos:", companhiasTransporte);
      },
      error: (error) => {
        console.error('Erro ao buscar companhias de transporte', error);
        alert('Erro ao buscar companhias de transporte: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

  remove(companhiaTransporteId: number) {
    this.service.remove(companhiaTransporteId).subscribe({
      next: () => {
        console.log('Companhia de Transporte removida com sucesso!');
        this.companhiasTransporte = this.companhiasTransporte.filter(companhiaTransporte => companhiaTransporte.id !== companhiaTransporteId);
      },
      error:(error) => {
        console.error('Erro ao remover Companhia de Transporte:', error);
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

  openVisualizeDialog(companhiaTransporte:CompanhiaTransporte){
    const dialogRef = this.dialog.open(VisualizarCompanhiaDeTransporteComponent, {
      width: '600px',
      data: companhiaTransporte,
    });
  }
  
  openCadastroDialog(){
    const dialogRef = this.dialog.open(CadastrarCompanhiaComponent, {
      data: { titulo: "Cadastrar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        window.location.reload();
      }
    });
  }

  openEdicaoDialog(id: number){
    const dialogRef = this.dialog.open(CadastrarCompanhiaComponent, {
      data: {
        idCompanhia: id,
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
