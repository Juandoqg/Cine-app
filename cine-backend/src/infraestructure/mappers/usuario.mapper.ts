import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioOrmEntity } from '../databases/typeorm/entities/usuario.orm-entity';

export class UsuarioMapper {
  static toDomain(ormEntity: UsuarioOrmEntity): Usuario {
    return new Usuario(
      ormEntity.id,
      ormEntity.nombre,
      ormEntity.apellido,
      ormEntity.email,
      ormEntity.telefono,
      ormEntity.password,
      ormEntity.activo,
      ormEntity.rol,
    );
  }

  static toOrmEntity(domainEntity: Usuario): UsuarioOrmEntity {
    const orm = new UsuarioOrmEntity();
    orm.id = domainEntity.id;
    orm.nombre = domainEntity.nombre;
    orm.apellido = domainEntity.apellido;
    orm.email = domainEntity.email;
    orm.telefono = domainEntity.telefono;
    orm.password = domainEntity.password;
    orm.activo = domainEntity.activo;
    orm.rol = domainEntity.rol;
    return orm;
  }
}
