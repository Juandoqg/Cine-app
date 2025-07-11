import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
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
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
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
  if (!this.tipoPagoSeleccionadoId) {
    alert('Por favor, selecciona un tipo de pago.');
    return;
  }

  if (!this.cliente) {
    alert('Debes iniciar sesión para procesar el pago.');
    return;
  }

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
          alert('¡Venta registrada y correo enviado con éxito!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al enviar el correo:', err);
          alert('Venta registrada, pero ocurrió un error al enviar el correo.');
          this.router.navigate(['/']);
        }
      });
    },
    error: (err) => {
      console.error('Error al registrar la venta:', err);
      alert('Ocurrió un error al registrar la venta.');
    }
  });
}
}
