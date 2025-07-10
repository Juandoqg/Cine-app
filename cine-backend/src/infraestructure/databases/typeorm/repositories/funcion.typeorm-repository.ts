import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FuncionOrmEntity } from '../entities/funcion.orm-entity';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';
import { FuncionMapper } from 'src/infraestructure/mappers/funcion.mapper';

@Injectable()
export class TypeOrmFuncionRepository implements FuncionRepository {
  constructor(
    @InjectRepository(FuncionOrmEntity)
    private readonly repo: Repository<FuncionOrmEntity>,
  ) {}

  async crear(funcion: Funcion): Promise<Funcion> {
  const orm = FuncionMapper.toOrm(funcion);

  const saved = await this.repo.save({
    ...orm,
    sala: { id: Number(funcion.salaId) },
    pelicula: { id: Number(funcion.peliculaId) },
  });

  return FuncionMapper.toDomain({
    ...saved,
    sala: { id: Number(funcion.salaId) },
    pelicula: { id: Number(funcion.peliculaId) },
  } as FuncionOrmEntity);
}

async buscarPorPelicula(peliculaId: string): Promise<Funcion[]> {
  const funcionesOrm = await this.repo.find({
    where: {
      pelicula: {
        id: Number(peliculaId),
      },
    },
    relations: ['sala', 'pelicula'],
  });

  return funcionesOrm.map(FuncionMapper.toDomain);
}

async obtenerPorId(id: number): Promise<Funcion | null> {
  const funcionOrm = await this.repo.findOne({
    where: { id },
    relations: ['pelicula', 'sala'],
  });

  if (!funcionOrm) return null;

  return FuncionMapper.toDomain(funcionOrm);
}

}
