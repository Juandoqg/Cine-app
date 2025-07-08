import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/usuarios/register-usuario.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUsuarioUseCase) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.registerUseCase.execute(body);
  }
}
