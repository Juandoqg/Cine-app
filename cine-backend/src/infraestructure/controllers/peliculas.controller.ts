import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreatePeliculaDto } from 'src/application/dto/create-pelicula.dto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { GetAllPeliculasUseCase } from 'src/application/use-cases/get-all-peliculas.use-case';
import { GetPeliculaByIdUseCase } from 'src/application/use-cases/get-peliculas-by-id';
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase, 
    private readonly getAllPeliculasUseCase: GetAllPeliculasUseCase, 
    private readonly getPeliculaByIdUseCase: GetPeliculaByIdUseCase) {}

  @Post()
  async crear(@Body() dto: CreatePeliculaDto): Promise<Pelicula> {
    return this.createPeliculaUseCase.execute(dto);
  }
  @Get()
  async getAll(): Promise<Pelicula[]> {
  return this.getAllPeliculasUseCase.execute();
}
 @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.getPeliculaByIdUseCase.execute(id);
  }
}
