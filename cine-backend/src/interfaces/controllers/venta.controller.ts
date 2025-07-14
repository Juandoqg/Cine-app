import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { CrearVentaUseCase } from 'src/application/use-cases/ventas/crear-venta.use-case';
import { ObtenerVentasUseCase } from 'src/application/use-cases/ventas/get-all-venta.use-case';
import { GetVentasByClienteIdUseCase } from 'src/application/use-cases/ventas/get-venta-por-cliente-id.use-case';
import { Venta } from 'src/domain/entities/venta.entity';
import { VentaMapper } from 'src/infraestructure/mappers/venta.mapper';

@Controller('ventas')
export class VentaController {
  constructor(
    private readonly crearVentaUseCase: CrearVentaUseCase,
    private readonly obtenerVentas: ObtenerVentasUseCase,
    private readonly getVentasByIdUseCase: GetVentasByClienteIdUseCase,
  ) {}

  // 🟢 Crear venta - solo autenticado
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async crearVenta(@Body() data: Omit<Venta, 'id'>): Promise<Venta> {
    return this.crearVentaUseCase.execute(data);
  }

  // 🔐 Ver todas las ventas - solo admin
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  async obtenerTodas(): Promise<Venta[]> {
    const ventasOrm = await this.obtenerVentas.execute();
    return ventasOrm.map(VentaMapper.toDomain);
  }

  // 🟢 Ver ventas de un cliente - autenticado
  @UseGuards(AuthGuard('jwt'))
  @Get('cliente/:id')
  async getVentasByCliente(@Param('id') id: string) {
    return this.getVentasByIdUseCase.execute(id);
  }
}
