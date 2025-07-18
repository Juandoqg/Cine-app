import { PeliculaOrmEntity } from 'src/infraestructure/databases/typeorm/entities/pelicula.orm-entity';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPeliculasAdminUseCase {
  constructor(private readonly repo: PeliculaRepository) {}

  async execute(): Promise<PeliculaOrmEntity[]> {
    return this.repo.listarTodas();
  }
}
