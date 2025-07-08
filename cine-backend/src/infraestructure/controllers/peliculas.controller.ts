import { Controller, Post, Get, Put, Param, Body , Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { CreatePeliculaDto } from 'src/application/dto/create-pelicula.dto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { GetAllPeliculasUseCase } from 'src/application/use-cases/get-all-peliculas.use-case';
import { GetPeliculaByIdUseCase } from 'src/application/use-cases/get-peliculas-by-id.use-case';
import { UpdatePeliculaUseCase} from 'src/application/use-cases/update-pelicula.use-case';
import { InhabilitarPeliculaUseCase } from 'src/application/use-cases/inhabilitar-pelicula.use-case';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase, 
    private readonly getAllPeliculasUseCase: GetAllPeliculasUseCase, 
    private readonly getPeliculaByIdUseCase: GetPeliculaByIdUseCase,
    private readonly updatePeliculaUseCase: UpdatePeliculaUseCase,
    private readonly inhabilitarPeliculaUseCase: InhabilitarPeliculaUseCase
) {}

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
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<Pelicula>) {
    return await this.updatePeliculaUseCase.execute(id, body);
  }
  @Patch(':id/inhabilitar')
  inhabilitar(@Param('id', ParseIntPipe) id: number) {
  return this.inhabilitarPeliculaUseCase.execute(id);
  }

}
