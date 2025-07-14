// application/use-cases/venta/get-ventas-por-funcion.use-case.ts
import { Inject } from '@nestjs/common';
import { VentaRepository } from 'src/domain/repositories/venta.repository';
import { Venta } from 'src/domain/entities/venta.entity';

export class GetVentasPorFuncionUseCase {
  constructor(
    @Inject('VentaRepository')
    private readonly ventaRepository: VentaRepository,
  ) {}

  async execute(funcionId: number): Promise<Venta[]> {
    return this.ventaRepository.getVentasPorFuncion(funcionId);
  }
}
