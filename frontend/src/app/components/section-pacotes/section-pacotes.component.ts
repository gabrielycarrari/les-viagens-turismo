import { Component } from '@angular/core';
import { CardComponent } from '../pacotes/card/card.component';
import { Router } from '@angular/router';
import { Pacote } from '../pacotes/pacote/pacote';
import { PacoteService } from '../pacotes/pacote/pacote.service';

@Component({
  selector: 'app-section-pacotes',
  standalone: true,
  imports: [ CardComponent ],
  templateUrl: './section-pacotes.component.html',
  styleUrl: './section-pacotes.component.scss'
})
export class SectionPacotesComponent {


  constructor(private service: PacoteService,private router: Router){}

  pacotes: Pacote[] = [];


  ngOnInit() {
    this.listar();
  }

  verPacotes(): void {
    this.router.navigate(['pacotes']);
  }

  listar(): void {
    this.service.list().subscribe({
      next: (pacotes) => {
        // Assume que os pacotes mais recentes estão no final do array
        this.pacotes = pacotes.slice(-3);
        console.log("Últimos três pacotes recebidos:", this.pacotes);
      },
      error: (error) => {
        console.error('Erro ao buscar pacotes', error);
        alert('Erro ao buscar pacotes: ' + error.message);
      }
    });
  }

}
