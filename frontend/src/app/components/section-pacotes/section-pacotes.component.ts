import { Component } from '@angular/core';
import { CardComponent } from '../pacotes/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-pacotes',
  standalone: true,
  imports: [ CardComponent ],
  templateUrl: './section-pacotes.component.html',
  styleUrl: './section-pacotes.component.scss'
})
export class SectionPacotesComponent {

  constructor(private router: Router) { }

  verPacotes(): void {
    this.router.navigate(['pacotes']);
  }
}
