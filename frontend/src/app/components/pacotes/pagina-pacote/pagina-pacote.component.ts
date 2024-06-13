import { ReservaService } from './../../reservas/reserva.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PacoteService } from '../pacote/pacote.service';
import { Pacote } from '../pacote/pacote';
import { AuthService } from '../../autenticacao/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RealizarReservaComponent } from '../../reservas/realizar-reserva/realizar-reserva.component';
import { Cliente } from '../../cliente/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-pagina-pacote',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    MatCardModule],
  templateUrl: './pagina-pacote.component.html',
  styleUrl: './pagina-pacote.component.scss'
})
export class PaginaPacoteComponent implements OnInit {

  pacote!:Pacote;
  constructor(private route: ActivatedRoute, private pacoteService: PacoteService,private authService: AuthService, private clienteService: ClienteService, public dialog: MatDialog, private reservaService: ReservaService, private router: Router,private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    const pacoteId = this.route.snapshot.paramMap.get('id');
    if (pacoteId) {
      this.pacoteService.getById(parseInt(pacoteId)).subscribe((data: any) => {
        this.pacote = data;
      });
    }
  }


  // carregarDados(): void {
  //   if (this.authService.getUserType() === 'CLIENTE') {
  //     this.carregarCliente(this.authService.getId());
  //   }
  // }



  iniciarProcessoReserva(): void {
    this.authService.isLoggedIn().subscribe({
      next: (loggedIn: boolean) => {
        if (loggedIn) {
          const clienteId = this.authService.getId();
          this.clienteService.getById(clienteId).subscribe({
            next: (cliente: Cliente) => {
              if(this.pacote.vagas > 0){
                this.openReservaDialog(cliente, this.pacote);
              } else{
                this.snackBar.open('O pacote não possui vagas disponíveis...', '', { duration: 5000, panelClass: ["snackbar-error"] });
              }
            },
            error: (err) => {
              console.error('Erro ao obter o cliente:', err);
            }
          });
        } else {
          this.router.navigate(['/login']);
          this.snackBar.open('É necessário fazer Login para realizar a Reserva...', '', { duration: 5000, panelClass: ["snackbar-error"] });
        }
      },
      error: (err) => {
        console.error('Erro ao verificar o status de login:', err);
      }
    });
  }

  reloadPacote(){
    if (this.pacote && this.pacote.id !== undefined) {
      const pacoteId = this.pacote.id;
      this.pacoteService.getById(pacoteId).subscribe(pacote => {
        this.pacote = pacote;
      })
    } else {

    }
  }


  openReservaDialog(cliente:Cliente, pacote:Pacote){
    const dialogRef = this.dialog.open(RealizarReservaComponent, {
      width: '800px',
      height: '550px',
      data: {cliente , pacote}
    });
    dialogRef.afterClosed().subscribe(result => {
        this.reloadPacote();
    });
  }
}
