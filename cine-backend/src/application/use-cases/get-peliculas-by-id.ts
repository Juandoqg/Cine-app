import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';

export class GetPeliculaByIdUseCase {
  constructor(private readonly peliculaRepository: PeliculaRepository) {}

  async execute(id: number): Promise<Pelicula | null> {
    return await this.peliculaRepository.buscarPorId(id);
  }
}
