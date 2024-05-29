import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel/hotel.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Hotel } from '../hotel/hotel';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';
import { CadastrarHotelComponent } from './cadastrar-hotel/cadastrar-hotel.component';

@Component({
  selector: 'app-dashboard-hoteis',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-hoteis.component.html',
  styleUrl: '../dashboard/dashboard.component.scss'
})
export class DashboardHoteisComponent implements OnInit {
  constructor(
    private service: HotelService,
    private authService : AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }


  hoteis: Hotel[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
        console.log("Hoteis recebidos:", hoteis);
      },
      error: (error) => {
        console.error('Erro ao buscar hoteis', error);
        alert('Erro ao buscar hoteis: ' + error.message);
      }
    });
  }


  remove(hotelId: number) {
    this.service.remove(hotelId).subscribe({
      next: () => {
        console.log('Hotel removido com sucesso!');
        this.hoteis = this.hoteis.filter(hotel => hotel.id !== hotelId);
      },
      error:(error) => {
        console.error('Erro ao remover Hotel:', error);
      }
    }
    );
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }



  openConfirmDialog(id: number, nome :String, info : String){
    const dialogRef = this.dialog.open(DialogDeletarComponent, {
      width: '250px',
      data: {nome, info },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(id);
      }
    });
  }

  openCadastroDialog(){
    const dialogRef = this.dialog.open(CadastrarHotelComponent, {
      data: { titulo: "Cadastrar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        window.location.reload();
      }
    });
  }

  openEdicaoDialog(id: number){
    const dialogRef = this.dialog.open(CadastrarHotelComponent, {
      data: {
        idHotel: id,
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
