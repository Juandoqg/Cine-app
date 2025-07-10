import { Injectable, Inject } from '@nestjs/common';
import { TipoPagoRepository } from 'src/domain/repositories/tipo-pago.repository';
import { TipoPago } from 'src/domain/entities/tipo-pago.entity';

@Injectable()
export class GetAllTipoPagoUseCase {
  constructor(@Inject ('TipoPagoRepository') private readonly tipoPagoRepo: TipoPagoRepository) {}

  async execute(): Promise<TipoPago[]> {
    return this.tipoPagoRepo.listar();
  }
}
