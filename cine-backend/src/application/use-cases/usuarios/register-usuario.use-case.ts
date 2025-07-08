import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { UsuarioModelDto } from 'src/application/dto/UsuarioModelDto';
import * as bcrypt from 'bcrypt';

export class RegisterUsuarioUseCase {
  constructor(private readonly repo: UsuarioRepository) {}

  async execute(dto: UsuarioModelDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const nuevoUsuario = new Usuario(
      0,
      dto.nombre,
      dto.apellido,
      dto.email,
      dto.telefono,
      hashedPassword,
      true,
      dto.rol
    );

    return this.repo.crear(nuevoUsuario);
  }
}
