import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';
import { FuncionModelDto } from 'src/application/dto/FuncionModelDto';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { GetFuncionesPorPeliculaUseCase } from 'src/application/use-cases/funciones/get-funcion-por-pelicula.use-case';
import { FuncionMapper } from '../../infraestructure/mappers/funcion.mapper';
import { ObtenerFuncionPorIdUseCase } from 'src/application/use-cases/funciones/get-funcion-por-id.use-case';
import { ObtenerFuncionesUseCase } from 'src/application/use-cases/funciones/get-all-funcion.use-case';
import { InhabilitarFuncionUseCase } from 'src/application/use-cases/funciones/inhabilitar-funcion.use-case';
import { HabilitarFuncionUseCase } from 'src/application/use-cases/funciones/habilitar-funcion.use-case';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';


@ApiTags('Funciones') 
@Controller('funciones')
export class FuncionesController {
  constructor(
    private readonly crearFuncionUseCase: CreateFuncionUseCase,
    private readonly buscarPorPeliculaUseCase: GetFuncionesPorPeliculaUseCase,
    private readonly obtenerFuncionPorIdUseCase: ObtenerFuncionPorIdUseCase,
    private readonly obtenerFuncionesUseCase: ObtenerFuncionesUseCase,
    private readonly inhabilitarFuncionUseCase: InhabilitarFuncionUseCase,
    private readonly habilitarFuncionUseCase: HabilitarFuncionUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Crear una nueva función' })
  @ApiResponse({ status: 201, description: 'Función creada exitosamente.' })
  async crear(@Body() dto: FuncionModelDto): Promise<Funcion> {
    return await this.crearFuncionUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Obtener todas las funciones' })
  @ApiResponse({ status: 200, description: 'Lista de funciones' })
  async obtenerTodas(): Promise<any[]> {
    const funciones = await this.obtenerFuncionesUseCase.execute();
    return funciones.map(funcion => FuncionMapper.toResponse(funcion));
  }

  @Get('pelicula/:peliculaId')
  @ApiOperation({ summary: 'Obtener funciones por ID de película' })
  @ApiParam({ name: 'peliculaId', type: String })
  @ApiResponse({ status: 200, description: 'Funciones encontradas' })
  async obtenerPorPelicula(@Param('peliculaId') peliculaId: string) {
    const funciones = await this.buscarPorPeliculaUseCase.execute(peliculaId);
    return funciones.map(funcion => FuncionMapper.toResponse(funcion));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('cliente')
  @ApiOperation({ summary: 'Obtener función por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Función encontrada' })
  @ApiResponse({ status: 404, description: 'Función no encontrada' })
  async obtenerPorId(@Param('id') id: string) {
    const funcion = await this.obtenerFuncionPorIdUseCase.execute(Number(id));
    if (!funcion) throw new NotFoundException('Función no encontrada');
    return funcion;
  }

  @Patch('/inhabilitar/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Inhabilitar una función' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Función inhabilitada correctamente' })
  async inhabilitarFuncion(@Param('id', ParseIntPipe) id: number) {
    await this.inhabilitarFuncionUseCase.execute(id);
    return { mensaje: 'Función inhabilitada correctamente' };
  }

  @Patch('habilitar/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Habilitar una función' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Función habilitada correctamente' })
  async habilitarFuncion(@Param('id') id: number) {
    return this.habilitarFuncionUseCase.execute(Number(id));
  }
}
