import { Component } from '@angular/core';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../../models/pelicula.model';

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

  constructor(
    private peliculasService: PeliculaService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pelicula.imagen = file.name; // solo guarda el nombre
    }
  }

  onCheckboxChange(campo: 'proximamente' | 'activo') {
    this.pelicula[campo] = !this.pelicula[campo];
  }

  onSubmit() {
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
  }
}
