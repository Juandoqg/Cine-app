
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasAdminComponent } from './peliculas-admin.component';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';
import { ActualizarPeliculaComponent } from './actualizar-pelicula/actualizar-pelicula.component';
import { ListarPeliculasComponent } from './listar-peliculas/listar-peliculas.component';

const routes: Routes = [
  {
    path: '',
    component: PeliculasAdminComponent
  },
  {
    path: 'crear',
    component: CrearPeliculaComponent
  },
  {
    path: 'listar',
    component: ListarPeliculasComponent
  },
  {
    path: 'editar/:id',
    component:ActualizarPeliculaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasAdminRoutingModule {}
