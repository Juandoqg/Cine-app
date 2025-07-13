
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFuncionesComponent } from './crear-funciones/crear-funciones.component';
import { GestionarFuncionesComponent } from './gestionar-funciones/gestionar-funciones.component';
import { FuncionesAdminComponent } from './funciones-admin.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionesAdminComponent
  },
  {
    path: 'crear',
    component: CrearFuncionesComponent
  },
  {
    path: 'gestionar',
    component: GestionarFuncionesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionesAdminRoutingModule {}
