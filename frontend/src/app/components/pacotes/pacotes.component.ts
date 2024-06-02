import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Pacote } from './pacote/pacote';
import { PacoteService } from './pacote/pacote.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacotes',
  standalone: true,
  imports: [
    NavbarComponent,
    CardComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './pacotes.component.html',
  styleUrl: './pacotes.component.scss'
})
export class PacotesComponent implements OnInit {

  constructor(private service: PacoteService,private router: Router,){}

  pacotes: Pacote[] = [];
  pacotesFiltrados: Pacote[] = [];


  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (pacotes) => {
        this.pacotes = pacotes;
        this.pacotesFiltrados = pacotes;
        console.log("Pacotes recebidos:", pacotes);
      },
      error: (error) => {
        console.error('Erro ao buscar pacotes', error);
        alert('Erro ao buscar pacotes: ' + error.message);
      }
    });
  }


  filtro(cidade: string): void {
    if (!cidade) {
      this.pacotesFiltrados = this.pacotes;
      return;
    }
    this.pacotesFiltrados = this.pacotes.filter(pacote =>
      pacote.enderecoDestino?.cidade.toLowerCase().includes(cidade.toLowerCase())
    );
  }


  onCardClick(pacote: Pacote): void {
    this.router.navigate(['/pagina-pacote', pacote.id]);
  }
}
