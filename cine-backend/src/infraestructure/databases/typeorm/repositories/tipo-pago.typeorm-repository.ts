// infrastructure/repositories/tipo-pago.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoPagoOrmEntity } from '../entities/tipo-pago.orm-entity';
import { TipoPago } from 'src/domain/entities/tipo-pago.entity';
import { TipoPagoRepository } from 'src/domain/repositories/tipo-pago.repository';
import { TipoPagoMapper } from 'src/infraestructure/mappers/tipo-pago.mapper';

@Injectable()
export class TipoPagoTypeOrmRepository implements TipoPagoRepository {
  constructor(
    @InjectRepository(TipoPagoOrmEntity)
    private readonly repo: Repository<TipoPagoOrmEntity>,
  ) {}

  async crear(tipoPago: TipoPago): Promise<TipoPago> {
    const orm = this.repo.create(TipoPagoMapper.toOrm(tipoPago));
    const guardado = await this.repo.save(orm);
    return TipoPagoMapper.toDomain(guardado);
  }

  async buscarPorId(id: number): Promise<TipoPago | null> {
    const result = await this.repo.findOneBy({ id });
    return result ? TipoPagoMapper.toDomain(result) : null;
  }

  async listar(): Promise<TipoPago[]> {
    const results = await this.repo.find();
    return results.map(TipoPagoMapper.toDomain);
  }
}
