// infrastructure/database/typeorm/repositories/pelicula.typeorm-repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PeliculaOrmEntity } from '../pelicula.orm-entity';
import { PeliculaMapper } from 'src/infraestructure/peliculas/pelicula.mapper';

import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { PeliculaRepository } from 'src/domain/repositories/pelicula.repository';

@Injectable()
export class PeliculaTypeOrmRepository implements PeliculaRepository {
  constructor(
    @InjectRepository(PeliculaOrmEntity)
    private readonly repo: Repository<PeliculaOrmEntity>,
  ) {}

  async crear(pelicula: Pelicula): Promise<Pelicula> {
    const orm = PeliculaMapper.toOrm(pelicula);
    const saved = await this.repo.save(orm);
    return PeliculaMapper.toDomain(saved);
  }

  async actualizar(id: number, data: Partial<Pelicula>): Promise<Pelicula> {
    await this.repo.update(id, data);
    const updated = await this.repo.findOneBy({ id });
    if (!updated) throw new Error('Película no encontrada');
    return PeliculaMapper.toDomain(updated);
  }

  async buscarPorId(id: number): Promise<Pelicula | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? PeliculaMapper.toDomain(found) : null;
  }

  async inhabilitar(id: number): Promise<void> {
    await this.repo.update(id, { activo: false });
  }

  async listar(): Promise<Pelicula[]> {
    const peliculas = await this.repo.find({ where: { activo: true } });
    return peliculas.map(PeliculaMapper.toDomain);
  }
}
