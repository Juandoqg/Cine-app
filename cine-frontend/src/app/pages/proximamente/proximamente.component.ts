import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrls: ['./proximamente.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ProximamenteComponent implements OnInit {
  peliculasProximamente: Pelicula[] = [];

  constructor(private peliculasService: PeliculaService) {}

  ngOnInit(): void {
  this.peliculasService.getPeliculasProximamente().subscribe((peliculas) => {
    this.peliculasProximamente = peliculas;
  });
}
verTrailer(event: Event, url: string): void {
  event.preventDefault();
  event.stopPropagation();
  window.open(url, '_blank');
}
}
