import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Injectable } from '@nestjs/common';

@Injectable()

export class UpdatePeliculaUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(id: number, data: Partial<Pelicula>): Promise<Pelicula | null> {
    const pelicula = await this.repo.buscarPorId(id);
    if (!pelicula) return null;

    Object.assign(pelicula, data);

    return await this.repo.actualizar(id,pelicula);
  }
}
