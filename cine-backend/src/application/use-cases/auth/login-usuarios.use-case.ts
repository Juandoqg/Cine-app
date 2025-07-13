import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Usuario } from 'src/domain/entities/usuario.entity';

export class LoginUsuarioUseCase {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const usuario = await this.repo.buscarPorEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo. Contacta al administrador.');
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }


  async executeGoogle(email: string): Promise<string> {
  let user = await this.repo.buscarPorEmail(email);

  if (!user) {
    user = await this.repo.crear(
      new Usuario(
        0,
        'GoogleUser',               // nombre
        'SinApellido',              // apellido por defecto
        email,
        '0000000000',               // teléfono por defecto
        '',                         // sin contraseña
        true,
        'cliente'
      )
    );
  }

  const payload = { sub: user.id, email: user.email, rol: user.rol };
  return this.jwtService.sign(payload, { expiresIn: '1h' });
}

}
