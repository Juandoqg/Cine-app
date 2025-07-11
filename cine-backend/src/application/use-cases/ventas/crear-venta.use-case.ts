import { Inject, Injectable } from "@nestjs/common";
import { Venta } from "src/domain/entities/venta.entity";
import { VentaRepository } from "src/domain/repositories/venta.repository";


@Injectable()
export class CrearVentaUseCase {
  constructor(@Inject ('VentaRepository')private readonly ventaRepository: VentaRepository) {}

  async execute(data: Omit<Venta, 'id' | 'fecha'>): Promise<Venta> {
    const venta: Omit<Venta, 'id'> = {
      ...data,
      fecha: new Date(),
    };

    return this.ventaRepository.crearVenta(venta);
  }
}
