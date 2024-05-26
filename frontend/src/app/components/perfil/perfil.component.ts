import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ClienteService } from '../cliente/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from '../autenticacao/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Cliente } from '../cliente/cliente';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatSidenavModule,
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  cliente: Cliente | null = null;
  informacoes = true;
  reservas = false;
  activeLink: string = 'informacoes';

  constructor(
    private clienteService: ClienteService,
    // private funcionarioService: FuncionarioService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.carregarDados();
    console.log(this.cliente)
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

  private carregarFuncionario(id: number){}

  navigateToAlterar(): void {
    console.log("entrou")
    this.router.navigate(['/alterar-perfil']);
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    if (link === 'informacoes') {
      this.informacoes = true;
      this.reservas = false;
    } else if (link === 'reservas') {
      this.informacoes = false;
      this.reservas = true;
    }
  }

}
