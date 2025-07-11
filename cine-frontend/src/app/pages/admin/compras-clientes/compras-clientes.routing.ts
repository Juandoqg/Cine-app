import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComprasComponent } from './consultar-compras/consultar-compras.component';
import { ComprasClientesComponent } from './compras-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasClientesComponent
  },
  {
    path: 'consultar-compras',
    component: ConsultarComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasAdminRoutingModule {}
