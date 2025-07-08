import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/domain/entities/usuario.entity';

export class LoginUsuarioUseCase {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const usuario = await this.repo.buscarPorEmail(email);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
