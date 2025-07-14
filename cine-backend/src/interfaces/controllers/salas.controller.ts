import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CrearSalaUseCase } from 'src/application/use-cases/salas/create-sala.use-case';
import { SalaModelDto, SalaResponseDto } from 'src/application/dto/SalaModelDto';
import { SalaMapper } from '../../infraestructure/mappers/sala.mapper';
import { GetAllSalasUseCase } from 'src/application/use-cases/salas/get-all-salas.use-cases';
import { ObtenerSalaPorIdUseCase } from 'src/application/use-cases/salas/get-sala-por-id.use-case';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Salas')
@ApiCookieAuth()
@Controller('salas')
export class SalasController {
  constructor(
    private readonly crearSalaUseCase: CrearSalaUseCase,
    private readonly obtenerSalasUseCase: GetAllSalasUseCase,
    private readonly obtenerSalaPorIdUseCase: ObtenerSalaPorIdUseCase
  ) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva sala (solo admin)' })
  @ApiResponse({ status: 201, description: 'Sala creada exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async crear(@Body() data: SalaModelDto): Promise<SalaResponseDto> {
    const sala = await this.crearSalaUseCase.execute(data);
    return SalaMapper.toResponseDto(sala);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener todas las salas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Listado de salas.' })
  async obtenerTodas(): Promise<SalaResponseDto[]> {
    const salas = await this.obtenerSalasUseCase.execute();
    return salas.map(SalaMapper.toResponseDto);
  }

  @Get(':id')
  @Roles('admin', 'cliente')
  @ApiOperation({ summary: 'Obtener sala por ID (admin y cliente)' })
  @ApiResponse({ status: 200, description: 'Sala encontrada.' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  async obtenerPorId(@Param('id') id: string): Promise<SalaResponseDto> {
    const sala = await this.obtenerSalaPorIdUseCase.execute(Number(id));
    return SalaMapper.toResponseDto(sala);
  }
}
