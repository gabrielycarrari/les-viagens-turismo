import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel/hotel.service';
import { AuthService } from '../autenticacao/auth.service';
import { Router } from '@angular/router';
import { Hotel } from '../hotel/hotel';

@Component({
  selector: 'app-dashboard-hoteis',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-hoteis.component.html',
  styleUrl: './dashboard-hoteis.component.scss'
})
export class DashboardHoteisComponent implements OnInit {
  constructor(
    private service: HotelService,
    private authService : AuthService,
    private router: Router
  ) { }


  hoteis: Hotel[] = [];

  ngOnInit() {
    this.listar();
  }

  listar(): void {
    this.service.list().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
        console.log("Hoteis recebidos:", hoteis);
      },
      error: (error) => {
        console.error('Erro ao buscar hoteis', error);
        alert('Erro ao buscar hoteis: ' + error.message);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }

}
