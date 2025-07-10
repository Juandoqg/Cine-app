import { Injectable , Inject} from '@nestjs/common';
import { TipoPagoRepository } from '../../../domain/repositories/tipo-pago.repository';
import { TipoPago } from '../../../domain/entities/tipo-pago.entity';

@Injectable()
export class CreateTipoPagoUseCase {
  constructor(@Inject ('TipoPagoRepository') private readonly tipoPagoRepo: TipoPagoRepository) {}

  async execute(nombre: string): Promise<TipoPago> {
    const nuevo = new TipoPago(0, nombre); // id se asigna en DB
    return await this.tipoPagoRepo.crear(nuevo);
  }
}
