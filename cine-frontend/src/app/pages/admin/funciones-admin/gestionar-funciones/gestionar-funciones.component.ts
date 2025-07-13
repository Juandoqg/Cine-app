import { Component } from '@angular/core';
import { FuncionService } from '../../../../services/funcion.service';
import { Funcion } from '../../../../models/funcion.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-funciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-funciones.component.html',
  styleUrl: './gestionar-funciones.component.css'
})
export class GestionarFuncionesComponent {
  funciones: Funcion[] = [];
  constructor(private funcionService: FuncionService) {}

ngOnInit(): void {
  this.funcionService.obtenerTodas().subscribe((funciones) => {
    this.funciones = funciones;
  });
}

seleccionarFuncion(funcion: Funcion): void {
  console.log('Función seleccionada:', funcion);
  // Lógica para editar o ver detalles
}

inhabilitarFuncion(id: number): void {
  console.log('Inhabilitar función con ID:', id);
  // Lógica para desactivar la función
}

mostrarModal: boolean = false;
funcionSeleccionada: any = null;

abrirModal(funcion: any) {
  this.funcionSeleccionada = funcion;
  this.mostrarModal = true;
}

cerrarModal() {
  this.funcionSeleccionada = null;
  this.mostrarModal = false;
}

confirmarCambioEstadoFuncion() {
  if (this.funcionSeleccionada) {
    const nuevaFuncion = { ...this.funcionSeleccionada };
    nuevaFuncion.activo = !nuevaFuncion.activo;

    // Aquí llamas al servicio para actualizar en backend...
   // this.servicio.actualizarFuncion(nuevaFuncion.id, nuevaFuncion).subscribe(() => {
      //this.funcionSeleccionada.activo = nuevaFuncion.activo;
     // this.cerrarModal();
   // });
  }
}
}
