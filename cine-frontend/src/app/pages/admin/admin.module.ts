import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PeliculasAdminComponent } from './peliculas-admin/peliculas-admin.component';
import { ClientesAdminComponent } from './clientes-admin/clientes-admin.component';
import { ComprasClientesComponent } from './compras-clientes/compras-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
