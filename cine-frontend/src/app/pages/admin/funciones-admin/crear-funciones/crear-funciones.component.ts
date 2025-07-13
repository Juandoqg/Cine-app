import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionService } from '../../../../services/funcion.service';
import { PeliculaService } from '../../../../services/pelicula.service';
import { SalaService } from '../../../../services/sala.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-funcion',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-funciones.component.html',
  styleUrls: ['./crear-funciones.component.css'],
})
export class CrearFuncionesComponent implements OnInit {
  peliculas: any[] = [];
  salas: any[] = [];

  funcion = {
    peliculaId: '',
    salaId: '',
    fecha: '',
    hora: '',
    precio: 0,
    activo: true, // siempre true por defecto
  };

  constructor(
    private funcionService: FuncionService,
    private peliculaService: PeliculaService,
    private salaService: SalaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.peliculaService.getPeliculasActivas().subscribe(p => (this.peliculas = p));
    this.salaService.obtenerTodas().subscribe(s => (this.salas = s));
  }

  onSubmit(): void {
   
  }
}
