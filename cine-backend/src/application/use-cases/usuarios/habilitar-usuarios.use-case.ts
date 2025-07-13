import { Injectable , Inject} from '@nestjs/common';
import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';

@Injectable()
export class HabilitarUsuarioUseCase {
constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}
  async execute(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.activo = true;
    await this.usuarioRepository.save(usuario);
  }
}
