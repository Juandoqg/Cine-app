import { Component, OnInit } from '@angular/core';
import { Funcion } from '../../../../models/funcion.model';
import { FuncionService } from '../../../../services/funcion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-funciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-funciones.component.html',
  styleUrls: ['./gestionar-funciones.component.css']
})
export class GestionarFuncionesComponent implements OnInit {
  funciones: Funcion[] = [];
  funcionesFiltradas: Funcion[] = [];

  filtro = {
    peliculaId: '',
    salaId: '',
    fecha: '',
    activo: ''
  };

  mostrarModal = false;
  funcionSeleccionada: Funcion | null = null;

  constructor(private funcionService: FuncionService) {}

  ngOnInit(): void {
    this.cargarFunciones();
  }

  cargarFunciones(): void {
    this.funcionService.obtenerTodas().subscribe({
      next: (data) => {
        this.funciones = data;
        this.aplicarFiltros();
      },
      error: (err) => console.error('Error cargando funciones', err)
    });
  }

  abrirModal(funcion: Funcion): void {
    this.funcionSeleccionada = funcion;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.funcionSeleccionada = null;
    this.mostrarModal = false;
  }
confirmarCambioEstado(): void {
  if (!this.funcionSeleccionada) return;

  const id = this.funcionSeleccionada.id;

  const callback = (success: boolean) => {
    if (success) {
      this.funcionSeleccionada!.activo = !this.funcionSeleccionada!.activo;
      this.aplicarFiltros();
      alert(`Función ${this.funcionSeleccionada!.activo ? 'habilitada' : 'inhabilitada'} con éxito.`);
    }
    this.cerrarModal();
  };

  if (this.funcionSeleccionada.activo) {
    this.funcionService.inhabilitarFuncion(id!).subscribe({
      next: () => callback(true),
      error: (err) => {
        console.error('Error al inhabilitar', err);
        callback(false);
      },
    });
  } else {
    this.funcionService.habilitarFuncion(id!).subscribe({
      next: () => callback(true),
      error: (err) => {
        console.error('Error al habilitar', err);
        callback(false);
      },
    });
  }
}


  aplicarFiltros(): void {
    this.funcionesFiltradas = this.funciones.filter(f => {
      const peliculaId = f.peliculaId.toLowerCase();
      const salaId = f.salaId.toLowerCase();
      const fecha = f.fecha.toLowerCase();
      const activo = f.activo.toString();

      const coincidePelicula = peliculaId.includes(this.filtro.peliculaId.toLowerCase());
      const coincideSala = salaId.includes(this.filtro.salaId.toLowerCase());
      const coincideFecha = fecha.includes(this.filtro.fecha.toLowerCase());
      const coincideActivo = this.filtro.activo === '' || activo === this.filtro.activo;

      return coincidePelicula && coincideSala && coincideFecha && coincideActivo;
    });
  }
}
