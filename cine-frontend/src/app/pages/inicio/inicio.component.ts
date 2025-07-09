import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})

export class InicioComponent implements OnInit {
  peliculasActivas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (peliculas) => {
        this.peliculasActivas = peliculas;
      },
      error: (err) => console.error('Error al obtener películas', err)
    });
  }

  verTrailer(event: Event, url: string): void {
  event.preventDefault();
  event.stopPropagation();
  window.open(url, '_blank');
}

}