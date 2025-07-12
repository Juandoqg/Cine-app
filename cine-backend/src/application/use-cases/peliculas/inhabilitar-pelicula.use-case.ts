import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Pelicula } from 'src/domain/entities/pelicula.entity';


import { Injectable } from '@nestjs/common';
@Injectable()
export class InhabilitarPeliculaUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(id: number): Promise<Pelicula | null> {
    const pelicula = await this.repo.buscarPorId(id);
    if (!pelicula) return null;

    pelicula.activo = false;
    pelicula.proximamente =false

    return await this.repo.actualizar(id, pelicula);
  }
}
