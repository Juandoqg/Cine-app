import { Controller, Post, Body } from '@nestjs/common';
import { CreatePeliculaDto } from 'src/application/dto/create-pelicula.dto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase) {}

  @Post()
  async crear(@Body() dto: CreatePeliculaDto): Promise<Pelicula> {
    return this.createPeliculaUseCase.execute(dto);
  }
}
