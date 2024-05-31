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
          this.snackBar.open('Ocorreu um erro ao carregar a avaliação.', '', { duration: 5000 });
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
