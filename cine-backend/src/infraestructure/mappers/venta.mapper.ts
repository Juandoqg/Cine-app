import { Venta } from 'src/domain/entities/venta.entity';
import { VentaOrmEntity } from '../databases/typeorm/entities/venta.orm-entity';

export class VentaMapper {
  static toDomain(orm: VentaOrmEntity): Venta {
    return new Venta(
      orm.id,
      orm.clienteId,
      orm.funcionId,
      orm.tipoPagoId,
      orm.cantidadTickets,
      orm.total,
      orm.fecha,
    );
  }

  static toOrmEntity(domain: Omit<Venta, 'id'>): VentaOrmEntity {
    const venta = new VentaOrmEntity();
    venta.clienteId = domain.clienteId;
    venta.funcionId = domain.funcionId;
    venta.tipoPagoId = domain.tipoPagoId;
    venta.cantidadTickets = domain.cantidadTickets;
    venta.total = domain.total;
    venta.fecha = domain.fecha;
    return venta;
  }
}
