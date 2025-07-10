import { SalaOrmEntity } from "../databases/typeorm/entities/sala.orm-entity";
import { Sala } from '../../domain/entities/sala.entity';
import { SalaResponseDto } from "src/application/dto/SalaModelDto";

export class SalaMapper {
  static toOrm(sala: Sala): SalaOrmEntity {
    const orm = new SalaOrmEntity();

    if (sala.id !== undefined) {
      orm.id = sala.id;
    }

    orm.nombre = sala.nombre;
    orm.capacidad = sala.capacidad;

    return orm;
  }

  static toDomain(orm: SalaOrmEntity): Sala {
    return new Sala(
      orm.nombre,
      orm.capacidad,
      orm.id 
    );
  }

  static toResponseDto(sala: Sala): SalaResponseDto {
    return {
      id: sala.id!,
      nombre: sala.nombre,
      capacidad: sala.capacidad,
    };
  }
}
