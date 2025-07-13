import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent implements OnInit {
  usuarios: Usuario[] = [];

  mostrarModal = false;
  usuarioSeleccionado: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.filter(u => u.rol === 'cliente');
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  abrirModal(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
  }

  confirmarInhabilitar(): void {
    if (!this.usuarioSeleccionado) return;

    this.usuarioService.inhabilitarUsuario(this.usuarioSeleccionado.id).subscribe({
      next: () => {
        this.usuarioSeleccionado!.activo = false;
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al inhabilitar', err);
        this.cerrarModal();
      }
    });
  }
}
