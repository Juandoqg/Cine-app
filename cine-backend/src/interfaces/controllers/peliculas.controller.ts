import { Controller, Post, Get, Put, Param, Body , Patch ,   UseGuards,} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { PeliculaModelDto } from 'src/application/dto/PeliculaModelDto';
import { CreatePeliculaUseCase } from 'src/application/use-cases/peliculas/create-pelicula.use-case';
import { Pelicula } from 'src/domain/entities/pelicula.entity';
import { GetAllPeliculasUseCase } from 'src/application/use-cases/peliculas/get-all-activas-peliculas.use-case';
import { GetPeliculaByIdUseCase } from 'src/application/use-cases/peliculas/get-peliculas-by-id.use-case';
import { UpdatePeliculaUseCase} from 'src/application/use-cases/peliculas/update-pelicula.use-case';
import { InhabilitarPeliculaUseCase } from 'src/application/use-cases/peliculas/inhabilitar-pelicula.use-case';
import { GetPeliculasProximamenteUseCase } from 'src/application/use-cases/peliculas/get-peliculas-proximamente';
import { GetAllPeliculasAdminUseCase } from 'src/application/use-cases/peliculas/get-all-peliculas.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';


@ApiTags('Películas')
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly createPeliculaUseCase: CreatePeliculaUseCase, 
    private readonly getAllPeliculasUseCase: GetAllPeliculasUseCase, 
    private readonly getPeliculaByIdUseCase: GetPeliculaByIdUseCase,
    private readonly updatePeliculaUseCase: UpdatePeliculaUseCase,
    private readonly inhabilitarPeliculaUseCase: InhabilitarPeliculaUseCase,
    private readonly getPeliculasProximamenteUseCase : GetPeliculasProximamenteUseCase,
    private readonly getAllPeliculasAdminUseCase: GetAllPeliculasAdminUseCase 
) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Crear nueva película (solo admin)' })
  @ApiResponse({ status: 201, description: 'Película creada exitosamente' })
  async crear(@Body() dto: PeliculaModelDto): Promise<Pelicula> {
    return this.createPeliculaUseCase.execute(dto);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todas las películas activas (publico)' })
  @ApiResponse({ status: 200, description: 'Lista de películas activas' })
  async getAll(): Promise<Pelicula[]> {
  return this.getAllPeliculasUseCase.execute();
  }
  

  @Get('proximamente')
  @ApiOperation({ summary: 'Obtener películas próximas a estrenar (publico)' })
  @ApiResponse({ status: 200, description: 'Lista de películas próximas' })
  async getProximamente(): Promise<Pelicula[]> {
  return this.getPeliculasProximamenteUseCase.execute();
  }


  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener todas las películas (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista completa de películas, activas o inactivas' })
  async getAllPeliculasAdmin(): Promise<Pelicula[]> {
    return this.getAllPeliculasAdminUseCase.execute(); 
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener película por ID (publico)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Película encontrada por ID' })
  async getById(@Param('id') id: number) {
    return await this.getPeliculaByIdUseCase.execute(id);
  }


  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Actualizar una película por ID ( solo admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Película actualizada exitosamente' })
  async update(@Param('id') id: number, @Body() body: Partial<Pelicula>) {
    return await this.updatePeliculaUseCase.execute(id, body);
  }


  @Patch('inhabilitar/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Inhabilitar una película ( solo admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Película inhabilitada correctamente' })
  inhabilitar(@Param('id', ParseIntPipe) id: number) {
  return this.inhabilitarPeliculaUseCase.execute(id);
  }

}
