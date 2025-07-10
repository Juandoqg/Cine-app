import { TipoPago } from '../entities/tipo-pago.entity';

export interface TipoPagoRepository {
  crear(tipoPago: TipoPago): Promise<TipoPago>;
  buscarPorId(id: number): Promise<TipoPago | null>;
  listar(): Promise<TipoPago[]>;
}
