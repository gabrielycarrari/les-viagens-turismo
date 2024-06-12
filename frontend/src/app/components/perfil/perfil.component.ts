import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ClienteService } from '../cliente/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from '../autenticacao/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Cliente } from '../cliente/cliente';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Reserva } from '../reservas/reserva';
import { ReservaService } from '../reservas/reserva.service';
import { MatIconModule } from '@angular/material/icon';
import { AvaliacaoService } from '../avaliacoes/avaliacao.service';
import { Avaliacao } from '../avaliacoes/avaliacao';
import { AvaliarPacoteComponent } from './avaliar-pacote/avaliar-pacote.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletarComponent } from '../dashboard/dialog-deletar/dialog-deletar.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  cliente: Cliente | null = null;
  informacoes = true;
  reservas = false;
  reservasCliente: Reserva[] = [];
  activeLink: string = 'informacoes';
  avaliacoes: Avaliacao[] = [];

  constructor(
    private clienteService: ClienteService,
    // private funcionarioService: FuncionarioService,
    private reservaService: ReservaService,
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarDados();
    this.carregarReservas();
  }


  carregarDados(): void {
    if (this.authService.getUserType() === 'CLIENTE') {
      this.carregarCliente(this.authService.getId());
    } else {
      this.carregarFuncionario(this.authService.getId());
    }
  }

  private carregarCliente(id: number){
    this.clienteService.getById(id).subscribe({
      next: (c) => {
        this.cliente = c;
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao carregar os dados.', '', { duration: 5000 });
      }
    });
  }

  carregarReservas(){
    this.reservaService.getReservasByCliente(this.authService.getId()).subscribe({
      next: (reservas) => {
        this.reservasCliente = reservas;
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao carregar as reservas.', '', { duration: 5000 });
      }
    });
  }

  carregarAvaliacoes(){
    for(let i = 0; i < this.reservasCliente.length; i++){
      const reserva = this.reservasCliente[i];
      if (reserva.pacote.id == null) continue;

      this.avaliacaoService.getAvaliacaoByPacoteAndCliente(reserva.pacote.id, this.authService.getId()).subscribe({
        next: (avaliacao) => {
          this.avaliacoes[i] = avaliacao;
        },
        error: () => {
          this.snackBar.open('Ocorreu um erro ao carregar a avaliação.', '', { duration: 5000, panelClass: ["snackbar-error"] });
        }
      });
    }
    console.log(this.avaliacoes)
  }

  private carregarFuncionario(id: number){}

  navigateToAlterar(): void {
    this.router.navigate(['/alterar-perfil']);
  }

  navigateToPacotes(): void {
    this.router.navigate(['pacotes']);
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    if (link === 'informacoes') {
      this.informacoes = true;
      this.reservas = false;
    } else if (link === 'reservas') {
      this.informacoes = false;
      this.reservas = true;

      this.carregarAvaliacoes();
    }
  }


  timeToString(time: any): string {
    if (typeof time === 'string') {
      return time;
    }
    const hours = time.hours ? String(time.hours).padStart(2, '0') : '00';
    const minutes = time.minutes ? String(time.minutes).padStart(2, '0') : '00';
    const seconds = time.seconds ? String(time.seconds).padStart(2, '0') : '00';
    return `${hours}:${minutes}:${seconds}`;
  }

  canRemoveReserva(dataSaida: any, horaSaida: any, reserva: Reserva): boolean {
    const currentDateTime = new Date();

    // Check if dataSaida is a string and convert it to a Date object if necessary
    if (typeof dataSaida === 'string') {
      dataSaida = new Date(dataSaida);
      if (isNaN(dataSaida.getTime())) {
        console.error('Invalid date string:', dataSaida);
        return false;
      }
    } else if (!(dataSaida instanceof Date)) {
      console.error('dataSaida is not a valid Date object:', dataSaida);
      return false;
    }

    // Convert horaSaida to string in HH:mm:ss format
    const horaSaidaString = this.timeToString(horaSaida);

    // Split dataSaida and horaSaidaString into parts
    const dateParts = dataSaida.toISOString().split('T')[0].split('-');
    const timeParts = horaSaidaString.split(':');

    // Create a Date object for the date and time of departure
    const dataHoraSaida = new Date(
      parseInt(dateParts[0]), // year
      parseInt(dateParts[1]) - 1, // month (0-based index)
      parseInt(dateParts[2]), // day
      parseInt(timeParts[0]), // hours
      parseInt(timeParts[1]), // minutes
      parseInt(timeParts[2]) // seconds
    );

    // Calculate the difference in milliseconds
    const timeDifference = dataHoraSaida.getTime() - currentDateTime.getTime();
    console.log(timeDifference);

    if (timeDifference > 24 * 60 * 60 * 1000) {
      if (reserva && reserva.id !== undefined) {
        this.openConfirmDialog(reserva.id, reserva.id.toString(), 'a reserva de Id');
      }
      return true;

    } else if( timeDifference < 0){
      this.snackBar.open('Não é possível cancelar reservas de pacotes que já aconteceram.', '', { duration: 5000 , panelClass: ["snackbar-error"] });
      return false;

    }
     else {
      this.snackBar.open('Não é possível cancelar reservas com menos de 24 horas de antecedência.', '', { duration: 5000 , panelClass: ["snackbar-error"] });
      return false;
    }
  }




  remove(reservaId: number) {
    this.reservaService.remove(reservaId).subscribe({
      next: () => {
        console.log('Reserva removida com sucesso!');
        this.reservasCliente = this.reservasCliente.filter(reserva => reserva.id !== reservaId);
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
      if (result==true) {
        this.remove(id);
        this.carregarReservas();
      }
    });
  }



  openAvaliarPacoteDialog(reserva: Reserva) {
    const dialogRef = this.dialog.open(AvaliarPacoteComponent, {
      width: '500px',
      minWidth: '260px',
      data: {
        reserva: reserva,
        avaliacao: this.avaliacoes[this.reservasCliente.indexOf(reserva)]
      },
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.carregarAvaliacoes();
      }
    });
  }

}
