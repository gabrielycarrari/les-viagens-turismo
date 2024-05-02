import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardClientesComponent } from './components/dashboard-clientes/dashboard-clientes.component';


import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "dashboard",
    component: DashboardClientesComponent
  },
  {
    path: "cadastro",
    component: CadastroClienteComponent
  }
];
