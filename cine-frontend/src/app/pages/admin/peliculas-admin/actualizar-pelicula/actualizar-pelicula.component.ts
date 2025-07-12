import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Pelicula } from '../../../../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-actualizar-pelicula',
  standalone: true,
  imports:[FormsModule, CommonModule   , ReactiveFormsModule],
  templateUrl: './actualizar-pelicula.component.html',
  styleUrls: ['./actualizar-pelicula.component.css'],

})
export class ActualizarPeliculaComponent implements OnInit {
  peliculaForm!: FormGroup;
  pelicula!: Pelicula;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.peliculaService.getPeliculaPorId(id).subscribe((data) => {
      this.pelicula = data;
      this.initForm();
    });
  }

  initForm(): void {
    this.peliculaForm = this.fb.group({
      titulo: [{ value: this.pelicula.titulo, disabled: true }],
      descripcion: [{ value: this.pelicula.descripcion, disabled: true }],
      categoria: [{ value: this.pelicula.categoria, disabled: true }],
      trailerUrl: [{ value: this.pelicula.trailerUrl, disabled: true }],
      imagen: [{ value: this.pelicula.imagen, disabled: true }],
      fechaEstreno: [{ value: this.pelicula.fechaEstreno, disabled: true }],
      duracion: [{ value: this.pelicula.duracion, disabled: true }],
      proximamente: [this.pelicula.proximamente],
      activo: [this.pelicula.activo],
    });

  
  }

   onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peliculaService.updatePelicula(+id, this.pelicula).subscribe({
        next: () => {
          alert('Película actualizada correctamente.');
          this.router.navigate(['/admin/peliculas/listar']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
        }
      });
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

}
