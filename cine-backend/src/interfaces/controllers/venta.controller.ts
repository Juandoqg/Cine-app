import { Body, Controller, Post, Get } from '@nestjs/common';
import { CrearVentaUseCase } from 'src/application/use-cases/ventas/crear-venta.use-case';
import { ObtenerVentasUseCase } from 'src/application/use-cases/ventas/get-all-venta.use-case';
import { Venta } from 'src/domain/entities/venta.entity';
import { VentaMapper } from 'src/infraestructure/mappers/venta.mapper';

@Controller('ventas')
export class VentaController {
  constructor(private readonly crearVentaUseCase: CrearVentaUseCase,
    private readonly obtenerVentas: ObtenerVentasUseCase
  ) {}

  @Post()
  async crearVenta(@Body() data: Omit<Venta, 'id'>): Promise<Venta> {
    return this.crearVentaUseCase.execute(data);
  }
   @Get()

   async obtenerTodas(): Promise<Venta[]> {
    const ventasOrm = await this.obtenerVentas.execute();
    return ventasOrm.map(VentaMapper.toDomain);
  }
}
