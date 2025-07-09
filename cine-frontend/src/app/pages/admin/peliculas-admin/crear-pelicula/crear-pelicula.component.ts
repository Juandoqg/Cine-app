import { Component } from '@angular/core';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../../models/pelicula.model';
import { UploadService} from '../../../../services/upload.services';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent {
  pelicula: Partial<Pelicula> = {
    titulo: '',
    descripcion: '',
    categoria: '',
    trailerUrl: '',
    fechaEstreno: new Date(),
    duracion: 0,
    proximamente: false,
    activo: true,
    imagen: '', // solo el nombre del archivo
  };
  imagenSeleccionada: File | null = null;

  constructor(
    private peliculasService: PeliculaService,
    private uploadService: UploadService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.imagenSeleccionada = input.files[0];
  }
}


  onCheckboxChange(campo: 'proximamente' | 'activo') {
    this.pelicula[campo] = !this.pelicula[campo];
  }

  async onSubmit() {
  try {
    if (this.imagenSeleccionada) {
      const response = await this.uploadService
        .subirImagen(this.imagenSeleccionada)
        .toPromise();
      this.pelicula.imagen = response.url;
    }

    this.peliculasService.crearPelicula(this.pelicula).subscribe({
      next: () => {
        alert('Película creada con éxito!');
        this.router.navigate(['/admin/peliculas']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear la película');
      },
    });
  } catch (err) {
    console.error(err);
    alert('Error al subir la imagen');
  }
}

}
