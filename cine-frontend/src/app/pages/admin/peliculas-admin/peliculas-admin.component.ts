import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-peliculas-admin',
  imports: [RouterModule],
  templateUrl: './peliculas-admin.component.html',
  styleUrl: './peliculas-admin.component.css'
})
export class PeliculasAdminComponent {
crearPelicula() {
  console.log('Crear película');
}

obtenerPeliculas() {
  console.log('Obtener películas');
}

actualizarPelicula() {
  console.log('Actualizar película');
}

inhabilitarPelicula() {
  console.log('Inhabilitar película');
}
}
