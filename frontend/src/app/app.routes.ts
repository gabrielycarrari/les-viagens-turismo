import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardClientesComponent } from './components/dashboard-clientes/dashboard-clientes.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { PacotesComponent } from './components/pacotes/pacotes.component';
import { AlterarPerfilComponent } from './components/perfil/alterar-perfil/alterar-perfil.component';
import { DashboardFuncionariosComponent } from './components/dashboard-funcionarios/dashboard-funcionarios.component';
import { DashboardHoteisComponent } from './components/dashboard-hoteis/dashboard-hoteis.component';
import { DashboardCompanhiasDeTransporteComponent } from './components/dashboard-companhias-de-transporte/dashboard-companhias-de-transporte.component';
import { DashboardPacotesComponent } from './components/dashboard-pacotes/dashboard-pacotes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

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
    path: "dashboard-hoteis",
    component: DashboardHoteisComponent
  },
  {
    path: "dashboard-companhiasTransporte",
    component: DashboardCompanhiasDeTransporteComponent
  },
  {
    path: "cadastro",
    component: CadastroClienteComponent
  },
  {
    path: "pacotes",
    component: PacotesComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  },
  {
    path: "alterar-perfil",
    component: AlterarPerfilComponent
  },
  {
    path: "dashboard-pacotes",
    component: DashboardPacotesComponent
  }
];
