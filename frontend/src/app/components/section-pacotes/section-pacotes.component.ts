import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-section-pacotes',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './section-pacotes.component.html',
  styleUrl: './section-pacotes.component.scss'
})
export class SectionPacotesComponent {

}
