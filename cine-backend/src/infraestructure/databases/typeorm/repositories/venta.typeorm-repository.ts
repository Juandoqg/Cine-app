import { Injectable } from '@nestjs/common';
import { VentaRepository } from 'src/domain/repositories/venta.repository';
import { VentaOrmEntity } from '../entities/venta.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from 'src/domain/entities/venta.entity';
import { VentaMapper } from 'src/infraestructure/mappers/venta.mapper';

@Injectable()
export class VentaTypeOrmRepository implements VentaRepository {
  constructor(
    @InjectRepository(VentaOrmEntity)
    private readonly ventaRepo: Repository<VentaOrmEntity>,
  ) {}

  async crearVenta(venta: Omit<Venta, 'id'>): Promise<Venta> {
    const ormEntity = VentaMapper.toOrmEntity(venta);
    const saved = await this.ventaRepo.save(ormEntity);
    return VentaMapper.toDomain(saved);
  }

  async obtenerTodas(): Promise<Venta[]> {
    const ventas = await this.ventaRepo.find({
      relations: ['tipoPago'], 
      order: { fecha: 'DESC' },
    });
    return ventas.map(VentaMapper.toDomain);
  }

  async findByClienteId(clienteId: string): Promise<Venta[]> {
  const ventas = await this.ventaRepo.find({
    where: {
      cliente: { id: Number(clienteId) }, 
    },
    relations: ['cliente', 'funcion', 'funcion.pelicula', 'funcion.sala'],
  });

  return ventas.map(VentaMapper.toDomain);
}
}
