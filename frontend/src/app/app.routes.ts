import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardClientesComponent } from './components/dashboard-clientes/dashboard-clientes.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { PacotesComponent } from './components/pacotes/pacotes.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardClientesComponent
  },
  {
    path: "cadastro",
    component: CadastroClienteComponent
  },
  {
    path: "pacotes",
    component: PacotesComponent
  }
];
