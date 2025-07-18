// infrastructure/peliculas/pelicula.mapper.ts
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { PeliculaOrmEntity } from '../databases/typeorm/entities/pelicula.orm-entity';

export class PeliculaMapper {
  static toDomain(orm: PeliculaOrmEntity): Pelicula {
    return new Pelicula(
      orm.id,
      orm.titulo,
      orm.descripcion,
      orm.categoria,
      orm.trailerUrl,
      orm.imagen,
      orm.fechaEstreno,
      orm.duracion,
      orm.proximamente,
      orm.activo,
    );
  }

  static toOrm(domain: Pelicula): PeliculaOrmEntity {
    const orm = new PeliculaOrmEntity();
    orm.id = domain.id;
    orm.titulo = domain.titulo;
    orm.descripcion = domain.descripcion;
    orm.categoria = domain.categoria;
    orm.trailerUrl = domain.trailerUrl;
    orm.imagen = domain.imagen;
    orm.fechaEstreno = domain.fechaEstreno;
    orm.duracion = domain.duracion;
    orm.proximamente = domain.proximamente;
    orm.activo = domain.activo;
    return orm;
  }
}
