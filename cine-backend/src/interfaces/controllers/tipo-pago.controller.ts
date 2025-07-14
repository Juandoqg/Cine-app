import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/crear-tipo-pago.use-case';
import { GetAllTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/get-all-tipo-pago.use-case';
import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Tipo de Pago')
@Controller('tipo-pago')
export class TipoPagoController {
  constructor(
    private getAllTipoPagoUseCase: GetAllTipoPagoUseCase,
    private createTipoPagoUseCase: CreateTipoPagoUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Crear un tipo de pago (solo admin)' })
  @ApiResponse({ status: 201, description: 'Tipo de pago creado exitosamente.' })
  async crear(@Body('nombre') nombre: string) {
    return await this.createTipoPagoUseCase.execute(nombre);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'cliente')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Listar tipos de pago (admin y cliente)' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de pago.' })
  async listar() {
    return this.getAllTipoPagoUseCase.execute();
  }
}
