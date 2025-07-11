import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-peliculas-admin',
  imports: [RouterModule, NavbarAdminComponent, FooterComponent],
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
