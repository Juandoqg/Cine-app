import { Injectable } from '@nestjs/common';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { CreatePeliculaDto } from '../dto/create-pelicula.dto';

@Injectable()
export class CreatePeliculaUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(dto: CreatePeliculaDto): Promise<Pelicula> {
    const pelicula = new Pelicula(
      0, // el ID lo genera la DB
      dto.titulo,
      dto.descripcion,
      dto.categoria,
      dto.trailerUrl,
      dto.imagen,
      new Date(dto.fechaEstreno),
      true,
    );

    return this.repo.crear(pelicula);
  }
}
