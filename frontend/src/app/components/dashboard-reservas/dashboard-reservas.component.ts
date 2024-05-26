import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reservas/reserva.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Reserva } from '../reservas/reserva';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-reservas',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-reservas.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardReservasComponent  implements OnInit {
  constructor(
    private service: ReservaService,
    private authService : AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }


  reservas: Reserva[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
        console.log("Reservas recebidas:", reservas);
      },
      error: (error) => {
        console.error('Erro ao buscar reservas', error);
        alert('Erro ao buscar reservas: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }


  remove(reservaId: number) {
    this.service.remove(reservaId).subscribe({
      next: () => {
        console.log('Reserva removida com sucesso!');
        this.reservas = this.reservas.filter(reserva => reserva.id !== reservaId);
      },
      error:(error) => {
        console.error('Erro ao remover Reserva:', error);
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
}

