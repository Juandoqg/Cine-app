import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComprasAdminRoutingModule } from './compras-clientes.routing';

import { ComprasClientesComponent } from './compras-clientes.component';
import { ConsultarComprasComponent } from './consultar-compras/consultar-compras.component';

@NgModule({
  declarations: [
    ComprasClientesComponent,
    ConsultarComprasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComprasAdminRoutingModule
  ]
})
export class ComprasModule { }
