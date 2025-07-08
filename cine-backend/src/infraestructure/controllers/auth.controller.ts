import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/usuarios/register-usuario.use-case';
import { LoginDto } from 'src/application/dto/LoginDto';
import { LoginUsuarioUseCase } from 'src/application/use-cases/usuarios/login-usuarios.use-case';


@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUsuarioUseCase,
    private readonly loginUseCase: LoginUsuarioUseCase
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.registerUseCase.execute(body);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}
