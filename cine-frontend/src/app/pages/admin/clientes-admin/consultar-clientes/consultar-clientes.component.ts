import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css'],
})
export class ConsultarClientesComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarModal: boolean = false;
  usuarioSeleccionado: Usuario | null = null;

  usuariosFiltrados: Usuario[] = [];

  filtro = {
    nombre: '',
    email: '',
    telefono: '',
    activo: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.filter((u) => u.rol === 'cliente');
      },
      error: (err) => console.error('Error cargando usuarios', err),
    });
  }

  abrirModal(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.usuarioSeleccionado = null;
    this.mostrarModal = false;
  }

  confirmarCambioEstado(): void {
    if (!this.usuarioSeleccionado) return;

    const id = this.usuarioSeleccionado.id;

    const callback = (success: boolean) => {
      if (success) {
        this.usuarioSeleccionado!.activo = !this.usuarioSeleccionado!.activo;
      }
      this.cerrarModal();
    };

    if (this.usuarioSeleccionado.activo) {
      this.usuarioService.inhabilitarUsuario(id).subscribe({
        next: () => callback(true),
        error: (err) => {
          console.error('Error al inhabilitar', err);
          callback(false);
        },
      });
    } else {
      this.usuarioService.habilitarUsuario(id).subscribe({
        next: () => callback(true),
        error: (err) => {
          console.error('Error al habilitar', err);
          callback(false);
        },
      });
    }
  }


   aplicarFiltros(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const coincideNombre = usuario.nombre.toLowerCase().includes(this.filtro.nombre.toLowerCase());
      const coincideEmail = usuario.email.toLowerCase().includes(this.filtro.email.toLowerCase());
      const coincideTelefono = usuario.telefono.includes(this.filtro.telefono);
      const coincideActivo =
        this.filtro.activo === '' || usuario.activo === (this.filtro.activo === 'true');

      return coincideNombre && coincideEmail && coincideTelefono && coincideActivo;
    });
  }
}
