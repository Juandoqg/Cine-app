import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVentas'
})
export class FiltroVentasPipe implements PipeTransform {
  transform(ventas: any[], filtro: string): any[] {
    if (!filtro) return ventas;
    const lowerFiltro = filtro.toLowerCase();
    return ventas.filter(venta =>
      venta.clienteId.toLowerCase().includes(lowerFiltro) ||
      venta.funcionId.toLowerCase().includes(lowerFiltro) ||
      venta.tipoPagoId.toLowerCase().includes(lowerFiltro)
    );
  }
}
