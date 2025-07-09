
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasAdminComponent } from './peliculas-admin.component';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';
import { ActualizarPeliculaComponent } from './actualizar-pelicula/actualizar-pelicula.component';
import { PeliculasAdminRoutingModule } from './peliculas-admin.routing';

@NgModule({
  declarations: [
    PeliculasAdminComponent,
    CrearPeliculaComponent,
    ActualizarPeliculaComponent
  ],
  imports: [
    CommonModule,
    PeliculasAdminRoutingModule,
  ]
})
export class PeliculasAdminModule {}
