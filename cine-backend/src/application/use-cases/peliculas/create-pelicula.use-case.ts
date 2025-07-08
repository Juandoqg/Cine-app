import { Injectable } from '@nestjs/common';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { PeliculaModelDto } from 'src/application/dto/PeliculaModelDto';

@Injectable()
export class CreatePeliculaUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(dto: PeliculaModelDto): Promise<Pelicula> {
    const pelicula = new Pelicula(
      0, // ID generado por la base de datos
      dto.titulo,
      dto.descripcion,
      dto.categoria,
      dto.trailerUrl,
      dto.imagen,
      new Date(dto.fechaEstreno),
      dto.duracion,
      dto.proximamente,
      dto.activo
    );

    return this.repo.crear(pelicula);
  }
}
