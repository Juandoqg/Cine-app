import { Body, Controller, Get, Post, Param, Patch , ParseIntPipe} from '@nestjs/common';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';
import { FuncionModelDto } from 'src/application/dto/FuncionModelDto';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { GetFuncionesPorPeliculaUseCase } from 'src/application/use-cases/funciones/get-funcion-por-pelicula.use-case';
import { FuncionMapper } from '../../infraestructure/mappers/funcion.mapper';
import { NotFoundException } from '@nestjs/common';
import { ObtenerFuncionPorIdUseCase} from 'src/application/use-cases/funciones/get-funcion-por-id.use-case';
import { ObtenerFuncionesUseCase } from 'src/application/use-cases/funciones/get-all-funcion.use-case';
import { InhabilitarFuncionUseCase } from 'src/application/use-cases/funciones/inhabilitar-funcion.use-case';
import { HabilitarFuncionUseCase } from 'src/application/use-cases/funciones/habilitar-funcion.use-case';


@Controller('funciones')
export class FuncionesController {
  constructor(
    private readonly crearFuncionUseCase: CreateFuncionUseCase,
    private readonly buscarPorPeliculaUseCase: GetFuncionesPorPeliculaUseCase,
    private readonly obtenerFuncionPorIdUseCase : ObtenerFuncionPorIdUseCase,
    private readonly obtenerFuncionesUseCase : ObtenerFuncionesUseCase,
    private readonly inhabilitarFuncionUseCase: InhabilitarFuncionUseCase,
    private readonly habilitarFuncionUseCase : HabilitarFuncionUseCase
  ) {}

  @Post()
  async crear(@Body() dto: FuncionModelDto): Promise<Funcion> {
    return await this.crearFuncionUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas(): Promise<any[]> {
    const funciones = await this.obtenerFuncionesUseCase.execute();
    return funciones.map(funcion => FuncionMapper.toResponse(funcion));
  }

 @Get('pelicula/:peliculaId')
  async obtenerPorPelicula(@Param('peliculaId') peliculaId: string) {
  const funciones = await this.buscarPorPeliculaUseCase.execute(peliculaId);
  return funciones.map(funcion => FuncionMapper.toResponse(funcion));
    }

@Get(':id')
async obtenerPorId(@Param('id') id: string) {
  const funcion = await this.obtenerFuncionPorIdUseCase.execute(Number(id));
  if (!funcion) throw new NotFoundException('Función no encontrada');
  return funcion;
}

@Patch('/inhabilitar/:id')
async inhabilitarFuncion(@Param('id', ParseIntPipe) id: number) {
  await this.inhabilitarFuncionUseCase.execute(id);
  return { mensaje: 'Función inhabilitada correctamente' };
}
@Patch('habilitar/:id')
async habilitarFuncion(@Param('id') id: number) {
  return this.habilitarFuncionUseCase.execute(Number(id));
}

}
