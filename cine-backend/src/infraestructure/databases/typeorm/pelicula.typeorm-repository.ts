import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeliculaOrmEntity } from './pelicula.orm-entity';
import { PeliculaRepository } from '../../../domain/repositories/pelicula.repository';
import { Pelicula } from '../../../domain/entities/pelicula.entity';
import { PeliculaMapper } from 'src/infraestructure/peliculas/pelicula.mapper';
@Injectable()
export class PeliculaTypeOrmRepository implements PeliculaRepository {
  constructor(
    @InjectRepository(PeliculaOrmEntity)
    private readonly repo: Repository<PeliculaOrmEntity>,
  ) {}

  async crear(pelicula: Pelicula): Promise<Pelicula> {
    const nueva = this.repo.create(pelicula);
    const guardada = await this.repo.save(nueva);
    return guardada;
  }

  async buscarPorId(id: number): Promise<Pelicula | null> {
    return this.repo.findOneBy({ id });
  }

  async listar(): Promise<Pelicula[]> {
    return this.repo.find();
  }

 async actualizar(id: number, data: Partial<Pelicula>): Promise<Pelicula> {
  await this.repo.update(id, data);
  const updated = await this.repo.findOneBy({ id });
  if (!updated) {
    throw new Error('Película no encontrada');
  }
  return PeliculaMapper.toDomain(updated);
    }

  async inhabilitar(id: number): Promise<void> {
  await this.repo.update(id, { activo: false });
    }

}