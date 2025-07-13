import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionesAdminComponent } from './funciones-admin.component';
import { CrearFuncionesComponent } from './crear-funciones/crear-funciones.component';
import { GestionarFuncionesComponent } from './gestionar-funciones/gestionar-funciones.component';
import { FuncionesAdminRoutingModule } from './funciones-admin.routing';


@NgModule({
  declarations: [
    FuncionesAdminComponent,
    CrearFuncionesComponent,
    GestionarFuncionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FuncionesAdminRoutingModule
  ]
})
export class ComprasModule { }
