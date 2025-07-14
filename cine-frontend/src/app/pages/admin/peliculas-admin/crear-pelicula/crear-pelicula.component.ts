import { Component } from '@angular/core';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../../models/pelicula.model';
import { UploadService} from '../../../../services/upload.service';

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

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Tipos de imagen válidos
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    // Validar tipo de archivo
    if (!validImageTypes.includes(file.type)) {
      alert('Por favor selecciona una imagen válida (JPG, JPEG, PNG, WEBP).');
      this.imagenSeleccionada = null;
      input.value = '';
      return;
    }

    this.imagenSeleccionada = file;
  } else {
    this.imagenSeleccionada = null;
  }
}


  onCheckboxChange(checkbox: 'proximamente' | 'activo'): void {
  if (checkbox === 'proximamente') {
    this.pelicula.proximamente = true;
    this.pelicula.activo = false;
  } else if (checkbox === 'activo') {
    this.pelicula.activo = true;
    this.pelicula.proximamente = false;
  }
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
