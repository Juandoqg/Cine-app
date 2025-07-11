import { Injectable } from '@nestjs/common';
import { VentaRepository } from 'src/domain/repositories/venta.repository';
import { VentaOrmEntity } from '../entities/venta.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from 'src/domain/entities/venta.entity';

@Injectable()
export class VentaTypeOrmRepository implements VentaRepository {
  constructor(
    @InjectRepository(VentaOrmEntity)
    private readonly ventaRepo: Repository<VentaOrmEntity>,
  ) {}

  async crearVenta(venta: Omit<Venta, 'id'>): Promise<Venta> {
    const nuevaVenta = this.ventaRepo.create(venta);
    return await this.ventaRepo.save(nuevaVenta);
  }
}
