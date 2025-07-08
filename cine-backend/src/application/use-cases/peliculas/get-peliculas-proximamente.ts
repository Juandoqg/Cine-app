import { Injectable } from '@nestjs/common';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Pelicula } from 'src/domain/entities/pelicula.entity';

@Injectable()
export class GetPeliculasProximamenteUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(): Promise<Pelicula[]> {
    const todas = await this.repo.listarProximamente();
    return todas.filter(pelicula => pelicula.proximamente === true);
  }
}
