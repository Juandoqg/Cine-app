import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';
import { FuncionModelDto } from 'src/application/dto/FuncionModelDto';
import { Funcion } from 'src/domain/entities/funcion.entity';

@Controller('funciones')
export class FuncionesController {
  constructor(
    private readonly crearFuncionUseCase: CreateFuncionUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: FuncionModelDto): Promise<Funcion> {
    return this.crearFuncionUseCase.execute(dto);
  }

  //@Get()
 // async obtenerTodas(): Promise<Funcion[]> {
  //  return this.obtenerFuncionesUseCase.execute();
  //}
}
