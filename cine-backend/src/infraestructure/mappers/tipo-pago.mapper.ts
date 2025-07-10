import { TipoPago } from 'src/domain/entities/tipo-pago.entity';
import { TipoPagoOrmEntity } from '../databases/typeorm/entities/tipo-pago.orm-entity';

export class TipoPagoMapper {
  static toDomain(orm: TipoPagoOrmEntity): TipoPago {
    return new TipoPago(orm.id, orm.nombre);
  }

  static toOrm(domain: TipoPago): TipoPagoOrmEntity {
    const orm = new TipoPagoOrmEntity();
    orm.id = domain.id;
    orm.nombre = domain.nombre;
    return orm;
  }
}
