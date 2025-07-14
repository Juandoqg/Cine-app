import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-compras',
  imports: [CommonModule],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent implements OnInit {
  ventas: any[] = [];
  salaFrecuente: string = ''; 
  ticketsVendidos: number = 0;
  pagoPreferido: string = '';

  // Filtros
  clienteSeleccionado: string = '';
  funcionSeleccionada: string = '';
  tipoPagoSeleccionado: string = '';

  constructor(private ventaService: VentaService, private authService : AuthService) {}

  ngOnInit(): void {
    const usuario = this.authService.getCurrentUser();

    if (usuario) {
      const idCliente = usuario.id;

      this.ventaService.obtenerVentasPorClienteId(idCliente).subscribe({
        next: (data) => {
          this.ventas = data.filter(v => v.clienteId === idCliente);
          this.calcularResumen();
        },
        error: (err) => console.error('Error al obtener ventas', err)
      });
    } else {
      console.warn('No hay usuario autenticado');
    }
  }

  calcularResumen(): void {
    this.ticketsVendidos = this.ventas.reduce((acc, venta) => acc + venta.cantidadTickets, 0);

    const conteoPagos: Record<string, number> = {};
    const conteoSalas: Record<number, number> = {};

    for (const venta of this.ventas) {
      // Contar tipo de pago
      conteoPagos[venta.tipoPagoId] = (conteoPagos[venta.tipoPagoId] || 0) + 1;

      // Contar sala (usa salaId directamente o accede desde funcion.salaId)
      const salaId = venta.salaId || venta.funcion?.salaId || venta.funcionId; // Ajusta según tu estructura
      conteoSalas[salaId] = (conteoSalas[salaId] || 0) + 1;
    }

    // Determinar el pago preferido
    this.pagoPreferido = Object.entries(conteoPagos).reduce((a, b) => a[1] > b[1] ? a : b, ['-', 0])[0];

    // Determinar la sala más frecuente
    this.salaFrecuente = Object.entries(conteoSalas).reduce((a, b) => a[1] > b[1] ? a : b, ['-', 0])[0];
  }

  // Método que retorna ventas según filtros aplicados
  ventasFiltradas(): any[] {
    return this.ventas.filter(v =>
      (!this.clienteSeleccionado || v.clienteId.toString() === this.clienteSeleccionado) &&
      (!this.funcionSeleccionada || v.funcionId.toString() === this.funcionSeleccionada) &&
      (!this.tipoPagoSeleccionado || v.tipoPagoId.toString() === this.tipoPagoSeleccionado)
    );
  }

}
