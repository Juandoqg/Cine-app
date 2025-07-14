import { Component, OnInit } from '@angular/core';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { VentaService } from '../../services/venta.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-procesar-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './procesar-pago.component.html',
  styleUrl: './procesar-pago.component.css'
})
export class ProcesarPagoComponent implements OnInit {
  pelicula: any;
  funcion: any;
  sala: any;
  cantidadTickets: number = 1;
  total: number = 0;
  numeroCuenta: string = ''; 

  tiposPago: any[] = [];
  tipoPagoSeleccionadoId: number | null = null;
  cliente: Usuario | null = null;

  mostrarModal: boolean = false;
  mensajeModal: string = '';
  estadoPago: string = '';
  procesandoPago: boolean = false;
  constructor(
    private router: Router,
    private tipoPagoService: TipoPagoService,
    private ventaService: VentaService,
    private authService: AuthService,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.pelicula = state.pelicula;
    this.funcion = state.funcion;
    this.sala = state.sala;
    this.cantidadTickets = state.cantidadTickets || 1;
    this.total = state.total || 0;

    this.tipoPagoService.obtenerTodos().subscribe((tipos) => {
      this.tiposPago = tipos;
    });

    // Obtener info del usuario autenticado
    this.authService.fetchUserInfo().subscribe(user => {
      if (user) {
        this.cliente = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }




confirmarPago(): void {
  if (!this.tipoPagoSeleccionadoId || !this.cliente) {
    alert('Debes seleccionar un tipo de pago e iniciar sesión.');
    return;
  }

  this.procesandoPago = true;
  this.mensajeModal = 'Procesando tu pago...';
  this.mostrarModal = true;

  const fechaObj = new Date(this.funcion.fecha);
  const fecha = fechaObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ventaData = {
    funcionId: this.funcion.id,
    cantidadTickets: this.cantidadTickets,
    tipoPagoId: this.tipoPagoSeleccionadoId,
    total: this.total,
    clienteId: this.cliente.id
  };

  this.ventaService.crearVenta(ventaData).subscribe({
    next: () => {
      const emailPayload = {
        to: this.cliente!.email,
        movie: this.pelicula?.titulo || 'Película',
        tickets: this.cantidadTickets,
        total: this.total,
        status: 'Pagado',
        fecha: fecha,
        hora: this.funcion.hora
      };

      this.mailService.enviarCorreoConfirmacion(emailPayload).subscribe({
        next: () => {
          this.mensajeModal = '¡Pago exitoso! Revisa tu correo.';
          setTimeout(() => {
            this.mostrarModal = false;
            this.router.navigate(['/']);
          }, 3000);
        },
        error: () => {
          this.mensajeModal = 'Pago exitoso, pero no se pudo enviar el correo.';
          setTimeout(() => {
            this.mostrarModal = false;
            this.router.navigate(['/']);
          }, 3000);
        }
      });
    },
    error: () => {
      this.mensajeModal = 'Error al procesar el pago. Intenta nuevamente.';
      setTimeout(() => {
        this.mostrarModal = false;
        this.procesandoPago = false;
      }, 3000);
    }
  });
}


}
