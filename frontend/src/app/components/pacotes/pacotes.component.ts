import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-pacotes',
  standalone: true,
  imports: [
    NavbarComponent,
    CardComponent,
    FooterComponent
  ],
  templateUrl: './pacotes.component.html',
  styleUrl: './pacotes.component.scss'
})
export class PacotesComponent {

}
