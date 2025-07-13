// infrastructure/controllers/usuarios.controller.ts

import { Controller, Get, Patch, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ObtenerUsuariosUseCase } from 'src/application/use-cases/usuarios/get-all-usuarios.use-case';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly obtenerUsuariosUseCase: ObtenerUsuariosUseCase,
    //private readonly inhabilitarUsuarioUseCase: InhabilitarUsuarioUseCase,
  ) {}

  @Get()
  async obtenerTodos(): Promise<Usuario[]> {
    return this.obtenerUsuariosUseCase.execute();
  }

  //@Patch(':id/inhabilitar')
 // @HttpCode(HttpStatus.NO_CONTENT)
  //async inhabilitar(@Param('id', ParseIntPipe) id: number): Promise<void> {
   // await this.inhabilitarUsuarioUseCase.ejecutar(id);
//}
}
