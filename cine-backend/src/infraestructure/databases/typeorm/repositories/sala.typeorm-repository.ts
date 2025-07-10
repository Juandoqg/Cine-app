
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SalaOrmEntity } from '../entities/sala.orm-entity';
import { SalaRepository } from 'src/domain/repositories/sala.repository';
import { Sala } from 'src/domain/entities/sala.entity';
import { SalaMapper } from 'src/infraestructure/mappers/sala.mapper';

@Injectable()
export class SalaTypeOrmRepository implements SalaRepository {
  constructor(
    @InjectRepository(SalaOrmEntity)
    private readonly salaRepo: Repository<SalaOrmEntity>,
  ) {}

  async crear(sala: Sala): Promise<Sala> {
    const ormEntity = SalaMapper.toOrm(sala);
    const guardada = await this.salaRepo.save(ormEntity);
    return SalaMapper.toDomain(guardada);
  }

  async obtenerTodas(): Promise<Sala[]> {
    const todas = await this.salaRepo.find();
    return todas.map(SalaMapper.toDomain);
  }
}
