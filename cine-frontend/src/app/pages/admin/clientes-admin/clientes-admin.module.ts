import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesAdminRoutingModule } from './clientes-admin.routing';
import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';

@NgModule({
  declarations: [ConsultarClientesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClientesAdminRoutingModule
  ]
})
export class ClientesAdminModule {}
