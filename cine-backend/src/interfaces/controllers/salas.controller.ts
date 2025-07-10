
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CrearSalaUseCase } from 'src/application/use-cases/salas/create-sala.use-case';
import { SalaModelDto, SalaResponseDto } from 'src/application/dto/SalaModelDto';
import { SalaMapper } from '../../infraestructure/mappers/sala.mapper';
import { GetAllSalasUseCase } from 'src/application/use-cases/salas/get-all-salas.use-cases';

@Controller('salas')
export class SalasController {
  constructor(
    private readonly crearSalaUseCase: CrearSalaUseCase,
    private readonly obtenerSalasUseCase: GetAllSalasUseCase
  ) {}

  @Post()
  async crear(@Body() data: SalaModelDto): Promise<SalaResponseDto> {
    const sala = await this.crearSalaUseCase.execute(data);
    return SalaMapper.toResponseDto(sala);
  }

  @Get()
    async obtenerTodas(): Promise<SalaResponseDto[]> {
    const salas = await this.obtenerSalasUseCase.execute();
   return salas.map(SalaMapper.toResponseDto);
  }

 // @Get(':id')
 // async obtenerPorId(@Param('id') id: string): Promise<SalaResponseDto> {
  //  const sala = await this.obtenerSalasUseCase.execute(id);
   // return SalaMapper.toResponseDto(sala);
//}
}
