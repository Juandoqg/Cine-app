import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/crear-tipo-pago.use-case';
import { GetAllTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/get-all-tipo-pago.use-case';


@Controller('tipo-pago')
export class TipoPagoController {
  constructor(private getAllTipoPagoUseCase : GetAllTipoPagoUseCase,
    private createTipoPagoUseCase : CreateTipoPagoUseCase
  ) {}

 @Post()
  async crear(@Body('nombre') nombre: string) {
    return await this.createTipoPagoUseCase.execute(nombre);
  }
  @Get()
  async listar() {
    return this.getAllTipoPagoUseCase.execute();
  }

  //@Get(':id')
  //async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
  //  return this.tipoPagoService.obtenerPorId(id);
 // }
}
