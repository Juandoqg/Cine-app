import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../../../services/pelicula.service';
import { Pelicula } from '../../../../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { NavbarAdminComponent } from '../../../../components/navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-listar-peliculas',
  imports:[CommonModule, FooterComponent, NavbarAdminComponent],
  templateUrl: './listar-peliculas.component.html',
  styleUrls: ['./listar-peliculas.component.css']
})
export class ListarPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
        console.log('Películas cargadas (admin):', this.peliculas);
      },
      error: (err) => {
        console.error('Error al obtener películas:', err);
      }
    });
  }
}
