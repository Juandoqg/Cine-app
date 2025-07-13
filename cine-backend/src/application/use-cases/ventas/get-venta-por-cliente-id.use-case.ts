import { Injectable, Inject } from '@nestjs/common';
import { VentaRepository } from 'src/domain/repositories/venta.repository';
import { Venta } from 'src/domain/entities/venta.entity';

@Injectable()
export class GetVentasByClienteIdUseCase {
  constructor(@Inject ('VentaRepository')private readonly ventaRepo: VentaRepository) {}

  async execute(clienteId: string): Promise<Venta[]> {
    return this.ventaRepo.findByClienteId(clienteId);
  }
}
