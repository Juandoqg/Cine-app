import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';
import { ClientesAdminComponent } from './clientes-admin.component';
import { InhabilitarClientesComponent } from './inhabilitar-clientes/inhabilitar-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesAdminComponent
  },
  {
    path: 'consultar-clientes',
    component: ConsultarClientesComponent
  },
  {
    path: 'inhabilitar-clientes',
    component: InhabilitarClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesAdminRoutingModule {}
