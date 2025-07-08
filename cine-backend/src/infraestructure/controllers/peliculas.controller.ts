import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePeliculaDto } from 'src/application/dto/create-pelicula.dto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { GetAllPeliculasUseCase } from 'src/application/use-cases/get-all-peliculas.use-case';
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase, private readonly getAllPeliculasUseCase: GetAllPeliculasUseCase) {}

  @Post()
  async crear(@Body() dto: CreatePeliculaDto): Promise<Pelicula> {
    return this.createPeliculaUseCase.execute(dto);
  }
  @Get()
  async getAll(): Promise<Pelicula[]> {
  return this.getAllPeliculasUseCase.execute();
}
}
