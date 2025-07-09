import { Injectable, Inject } from '@nestjs/common';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';
import { Funcion } from 'src/domain/entities/funcion.entity';

@Injectable()
export class GetFuncionesPorPeliculaUseCase {
  constructor(@Inject('FuncionRepository')private readonly funcionRepo: FuncionRepository) {}

  async execute(peliculaId: string): Promise<Funcion[]> {
    return await this.funcionRepo.buscarPorPelicula(peliculaId);
  }
}
