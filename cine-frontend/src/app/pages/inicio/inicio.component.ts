import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})

export class InicioComponent implements OnInit {
  peliculasActivas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (peliculas) => {
        this.peliculasActivas = peliculas.filter(p => p.activo && !p.proximamente);
      },
      error: (err) => console.error('Error al obtener películas', err)
    });
  }
}