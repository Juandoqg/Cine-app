import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PeliculasAdminComponent } from './peliculas-admin/peliculas-admin.component';
import { ClientesAdminComponent } from './clientes-admin/clientes-admin.component';
import { ComprasClientesComponent } from './compras-clientes/compras-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'peliculas', component: PeliculasAdminComponent },
      { path: 'clientes', component: ClientesAdminComponent },
      { path: 'compras', component: ComprasClientesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
