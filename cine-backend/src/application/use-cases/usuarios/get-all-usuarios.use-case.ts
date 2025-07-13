
import { Inject } from '@nestjs/common';
import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { Usuario } from 'src/domain/entities/usuario.entity';

export class ObtenerUsuariosUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(): Promise<Usuario[]> {
    return this.usuarioRepository.obtenerTodos();
  }
}
