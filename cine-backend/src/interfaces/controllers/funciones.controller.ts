import { Body, Controller, Get, Post, Param} from '@nestjs/common';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';
import { FuncionModelDto } from 'src/application/dto/FuncionModelDto';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { GetFuncionesPorPeliculaUseCase } from 'src/application/use-cases/funciones/get-funcion-por-pelicula.use-case';
import { FuncionMapper } from '../../infraestructure/funciones/funcion.mapper';

@Controller('funciones')
export class FuncionesController {
  constructor(
    private readonly crearFuncionUseCase: CreateFuncionUseCase,
    private readonly buscarPorPeliculaUseCase: GetFuncionesPorPeliculaUseCase
  ) {}

  @Post()
  async crear(@Body() dto: FuncionModelDto): Promise<Funcion> {
    return await this.crearFuncionUseCase.execute(dto);
  }

 @Get('pelicula/:peliculaId')
  async obtenerPorPelicula(@Param('peliculaId') peliculaId: string) {
  const funciones = await this.buscarPorPeliculaUseCase.execute(peliculaId);
  return funciones.map(funcion => FuncionMapper.toResponse(funcion));
    }
}
