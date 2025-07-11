import { Body, Controller, Post } from '@nestjs/common';
import { CrearVentaUseCase } from 'src/application/use-cases/ventas/crear-venta.use-case';
import { Venta } from 'src/domain/entities/venta.entity';

@Controller('ventas')
export class VentaController {
  constructor(private readonly crearVentaUseCase: CrearVentaUseCase) {}

  @Post()
  async crearVenta(@Body() data: Omit<Venta, 'id'>): Promise<Venta> {
    return this.crearVentaUseCase.execute(data);
  }
}
