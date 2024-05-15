import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardClientesComponent } from './components/dashboard-clientes/dashboard-clientes.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { PacotesComponent } from './components/pacotes/pacotes.component';
import { DashboardFuncionariosComponent } from './components/dashboard-funcionarios/dashboard-funcionarios.component';

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
    path: "dashboard-clientes",
    component: DashboardClientesComponent
  },
  {
    path: "dashboard-funcionarios",
    component: DashboardFuncionariosComponent
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
