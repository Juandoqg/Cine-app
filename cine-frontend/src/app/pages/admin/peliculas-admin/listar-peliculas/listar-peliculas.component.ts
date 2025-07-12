import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Pelicula } from '../../../../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-peliculas.component.html',
  styleUrls: ['./listar-peliculas.component.css']
})
export class ListarPeliculasComponent implements OnInit {
  peliculasCartelera: Pelicula[] = [];
  peliculasProximamente: Pelicula[] = [];
  peliculasInhabilitadas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculasCartelera = data.filter(p => p.activo && !p.proximamente);
        this.peliculasProximamente = data.filter(p => p.proximamente && !p.activo);
        this.peliculasInhabilitadas = data.filter(p => !p.activo && !p.proximamente);
      },
      error: (err) => {
        console.error('Error al obtener películas:', err);
      }
    });
  }

  verTrailer(event: Event, url: string): void {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank');
  }
}
