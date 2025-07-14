import { Body, Controller, Post, Get , Param, UseGuards } from '@nestjs/common';
import { CrearVentaUseCase } from 'src/application/use-cases/ventas/crear-venta.use-case';
import { ObtenerVentasUseCase } from 'src/application/use-cases/ventas/get-all-venta.use-case';
import { GetVentasByClienteIdUseCase } from 'src/application/use-cases/ventas/get-venta-por-cliente-id.use-case';
import { Venta } from 'src/domain/entities/venta.entity';
import { VentaMapper } from 'src/infraestructure/mappers/venta.mapper';
import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Ventas')
@Controller('ventas')
export class VentaController {
  constructor(
    private readonly crearVentaUseCase: CrearVentaUseCase,
    private readonly obtenerVentas: ObtenerVentasUseCase,
    private readonly getVentasByIdUseCase : GetVentasByClienteIdUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('cliente') // solo clientes pueden crear ventas
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Crear nueva venta (solo clientes)' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente.' })
  async crearVenta(@Body() data: Omit<Venta, 'id'>): Promise<Venta> {
    return this.crearVentaUseCase.execute(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Obtener todas las ventas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de todas las ventas.' })
  async obtenerTodas(): Promise<Venta[]> {
    const ventasOrm = await this.obtenerVentas.execute();
    return ventasOrm.map(VentaMapper.toDomain);
  }

  @Get('cliente/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('cliente', 'admin') 
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Obtener ventas por cliente (solo cliente)' })
  @ApiResponse({ status: 200, description: 'Ventas del cliente.' })
  async getVentasByCliente(@Param('id') id: string) {
    return this.getVentasByIdUseCase.execute(id);
  }
}
