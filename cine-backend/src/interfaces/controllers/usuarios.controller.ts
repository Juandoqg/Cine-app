import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ObtenerUsuariosUseCase } from 'src/application/use-cases/usuarios/get-all-usuarios.use-case';
import { InhabilitarUsuarioUseCase } from 'src/application/use-cases/usuarios/inhabilitar-usuarios.use-case';
import { HabilitarUsuarioUseCase } from 'src/application/use-cases/usuarios/habilitar-usuarios.use-case';

import { JwtAuthGuard } from 'src/infraestructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/guards/roles.guard';
import { Roles } from 'src/infraestructure/decorators/roles.decorator';

import { Usuario } from 'src/domain/entities/usuario.entity';

@ApiTags('Usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('usuarios')
@ApiBearerAuth('access_token') 
export class UsuariosController {
  constructor(
    private readonly obtenerUsuariosUseCase: ObtenerUsuariosUseCase,
    private readonly inhabilitarUsuarioUseCase: InhabilitarUsuarioUseCase,
    private readonly habilitarUsuarioUseCase: HabilitarUsuarioUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] })
  async obtenerTodos(): Promise<Usuario[]> {
    return this.obtenerUsuariosUseCase.execute();
  }

  @Patch('inhabilitar/:id')
  @ApiOperation({ summary: 'Inhabilitar un usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario inhabilitado exitosamente' })
  async inhabilitar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.inhabilitarUsuarioUseCase.execute(id);
  }

  @Patch('habilitar/:id')
  @ApiOperation({ summary: 'Habilitar un usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario habilitado exitosamente' })
  async habilitarUsuario(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.habilitarUsuarioUseCase.execute(id);
  }
}
