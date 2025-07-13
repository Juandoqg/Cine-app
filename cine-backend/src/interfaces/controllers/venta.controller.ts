import { Body, Controller, Post, Get , Param } from '@nestjs/common';
import { CrearVentaUseCase } from 'src/application/use-cases/ventas/crear-venta.use-case';
import { ObtenerVentasUseCase } from 'src/application/use-cases/ventas/get-all-venta.use-case';
import { GetVentasByClienteIdUseCase } from 'src/application/use-cases/ventas/get-venta-por-cliente-id.use-case';
import { Venta } from 'src/domain/entities/venta.entity';
import { VentaMapper } from 'src/infraestructure/mappers/venta.mapper';

@Controller('ventas')
export class VentaController {
  constructor(private readonly crearVentaUseCase: CrearVentaUseCase,
    private readonly obtenerVentas: ObtenerVentasUseCase,
    private readonly getVentasByIdUseCase : GetVentasByClienteIdUseCase
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

      @Get('cliente/:id')
    async getVentasByCliente(@Param('id') id: string) {
      return this.getVentasByIdUseCase .execute(id);
    }
}
