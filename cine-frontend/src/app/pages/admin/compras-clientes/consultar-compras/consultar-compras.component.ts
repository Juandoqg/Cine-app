import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../../services/venta.service';
import { FiltroVentasPipe } from '../../../../filtro-ventas.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-compras',
  imports: [CommonModule, FiltroVentasPipe, FormsModule],
  templateUrl: './consultar-compras.component.html',
  styleUrl: './consultar-compras.component.css'
})
export class ConsultarComprasComponent implements OnInit {
  ventas: any[] = [];
  totalVendido: number = 0;
  ticketsVendidos: number = 0;
  pagoPreferido: string = '';
  filtro: string = '';


  constructor(private ventaService : VentaService) {}

 
  ngOnInit(): void {
    this.ventaService.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.calcularResumen();
    },
      error: (err) => console.error('Error al obtener ventas', err)
    });
  }


   calcularResumen(): void {
    this.totalVendido = this.ventas.reduce((acc, venta) => acc + venta.total, 0);
    this.ticketsVendidos = this.ventas.reduce((acc, venta) => acc + venta.cantidadTickets, 0);

    // Calcular el método de pago más usado
    const conteoPagos: Record<string, number> = {};
    for (const venta of this.ventas) {
      conteoPagos[venta.tipoPagoId] = (conteoPagos[venta.tipoPagoId] || 0) + 1;
    }

    this.pagoPreferido = Object.entries(conteoPagos).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }
}