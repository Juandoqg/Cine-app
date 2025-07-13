// infrastructure/controllers/usuarios.controller.ts

import { Controller, Get, Patch, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ObtenerUsuariosUseCase } from 'src/application/use-cases/usuarios/get-all-usuarios.use-case';
import { InhabilitarUsuarioUseCase } from 'src/application/use-cases/usuarios/inhabilitar-usuarios.use-case';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly obtenerUsuariosUseCase: ObtenerUsuariosUseCase,
    private readonly inhabilitarUsuarioUseCase: InhabilitarUsuarioUseCase,
  ) {}

  @Get()
  async obtenerTodos(): Promise<Usuario[]> {
    return this.obtenerUsuariosUseCase.execute();
  }

  @Patch('inhabilitar/:id')
  async inhabilitar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.inhabilitarUsuarioUseCase.execute(id);
  }
}
