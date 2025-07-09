import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrls: ['./proximamente.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class ProximamenteComponent implements OnInit {
  peliculasProximamente: Pelicula[] = [];

  constructor(private peliculasService: PeliculaService) {}

  ngOnInit(): void {
  this.peliculasService.getPeliculasProximamente().subscribe((peliculas) => {
    this.peliculasProximamente = peliculas;
  });
}

}
