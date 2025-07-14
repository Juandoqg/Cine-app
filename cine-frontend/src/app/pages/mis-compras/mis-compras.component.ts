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
  mayorCompra: number = 0; 
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
        let maxTotal = 0;

        for (const venta of this.ventas) {
          // Contar tipo de pago
          conteoPagos[venta.tipoPagoId] = (conteoPagos[venta.tipoPagoId] || 0) + 1;

          // Verificar si esta venta tiene el total más alto
          if (venta.total > maxTotal) {
            maxTotal = venta.total;
          }
        }

        this.mayorCompra = maxTotal;
        this.pagoPreferido = Object.entries(conteoPagos).reduce((a, b) => a[1] > b[1] ? a : b, ['-', 0])[0];
      }



}
