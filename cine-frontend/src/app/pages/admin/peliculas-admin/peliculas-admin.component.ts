import { Component } from '@angular/core';

@Component({
  selector: 'app-peliculas-admin',
  imports: [],
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
