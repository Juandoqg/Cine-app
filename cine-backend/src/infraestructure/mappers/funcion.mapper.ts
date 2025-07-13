import { Funcion } from 'src/domain/entities/funcion.entity';
import { FuncionOrmEntity } from '../databases/typeorm/entities/funcion.orm-entity';

export class FuncionMapper {
  static toDomain(orm: FuncionOrmEntity): Funcion {
    return new Funcion(
      orm.id,
      orm.pelicula?.id.toString() ?? '',  
      orm.sala?.id.toString() ?? '',     
      orm.fecha,
      orm.hora,
      Number(orm.precio),
      orm.activo
    );
  }

  static toOrm(funcion: Funcion): Partial<FuncionOrmEntity> {
    return {
      fecha: funcion.fecha,
      hora: funcion.hora,
      precio: funcion.precio,
      
    };
  }

  static toResponse(funcion: Funcion): any {
    return {
      id: funcion.id,
      peliculaId: funcion.peliculaId,
      salaId: funcion.salaId,
      fecha: funcion.fecha,
      hora: funcion.hora,
      precio: funcion.precio,
      activo: funcion.activo
    };
  }
}
