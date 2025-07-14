import { Venta } from '../entities/venta.entity';

export abstract class VentaRepository {
  abstract crearVenta(venta: Omit<Venta, 'id'>): Promise<Venta>;
  abstract obtenerTodas(): Promise<Venta[]>;
  abstract findByClienteId(clienteId: string): Promise<Venta[]>;
  abstract getVentasPorFuncion(funcionId: number): Promise<Venta[]>;
}
