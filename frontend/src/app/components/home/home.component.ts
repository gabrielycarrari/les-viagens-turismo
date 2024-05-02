import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardComponent } from '../card/card.component';
import { SectionPacotesComponent } from '../section-pacotes/section-pacotes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CardComponent, FooterComponent, SectionPacotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
