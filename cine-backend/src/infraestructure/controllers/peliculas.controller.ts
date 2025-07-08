import { Controller, Post, Get, Put, Param, Body , Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { PeliculaModelDto } from 'src/application/dto/PeliculaModelDto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/peliculas/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { GetAllPeliculasUseCase } from 'src/application/use-cases/peliculas/get-all-peliculas.use-case';
import { GetPeliculaByIdUseCase } from 'src/application/use-cases/peliculas/get-peliculas-by-id.use-case';
import { UpdatePeliculaUseCase} from 'src/application/use-cases/peliculas/update-pelicula.use-case';
import { InhabilitarPeliculaUseCase } from 'src/application/use-cases/peliculas/inhabilitar-pelicula.use-case';
import { GetPeliculasProximamenteUseCase } from 'src/application/use-cases/peliculas/get-peliculas-proximamente';



@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase, 
    private readonly getAllPeliculasUseCase: GetAllPeliculasUseCase, 
    private readonly getPeliculaByIdUseCase: GetPeliculaByIdUseCase,
    private readonly updatePeliculaUseCase: UpdatePeliculaUseCase,
    private readonly inhabilitarPeliculaUseCase: InhabilitarPeliculaUseCase,
    private readonly getPeliculasProximamenteUseCase : GetPeliculasProximamenteUseCase
) {}

  @Post()
  async crear(@Body() dto: PeliculaModelDto): Promise<Pelicula> {
    return this.createPeliculaUseCase.execute(dto);
  }
  @Get()
  async getAll(): Promise<Pelicula[]> {
  return this.getAllPeliculasUseCase.execute();
  }
  
  @Get('proximamente')
  async getProximamente(): Promise<Pelicula[]> {
  return this.getPeliculasProximamenteUseCase.execute();
  }

 @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.getPeliculaByIdUseCase.execute(id);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<Pelicula>) {
    return await this.updatePeliculaUseCase.execute(id, body);
  }
  @Patch(':id/inhabilitar')
  inhabilitar(@Param('id', ParseIntPipe) id: number) {
  return this.inhabilitarPeliculaUseCase.execute(id);
  }

}
