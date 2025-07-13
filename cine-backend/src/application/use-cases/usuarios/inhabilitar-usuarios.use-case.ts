import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';

@Injectable()
export class InhabilitarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository') private readonly usuarioRepo: UsuarioRepository
  ) {}

  async execute(id: number): Promise<void> {
    const usuario = await this.usuarioRepo.findById(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.activo = false;
    await this.usuarioRepo.save(usuario);
  }
}
