import { Controller, Post, Body, HttpCode,Res , Req, Get} from '@nestjs/common';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/auth/register-usuario.use-case';
import { LoginDto } from 'src/application/dto/LoginDto';
import { LoginUsuarioUseCase } from 'src/application/use-cases/auth/login-usuarios.use-case';
import { Response } from 'express'; 
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infraestructure/guards/jwt-auth.guard';

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
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.loginUseCase.execute(dto.email, dto.password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 // 1 hora
    });

    return { message: 'Login exitoso' };
  }

 @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    const user = req['user'];
    return {
      id: user.sub,
      email: user.email,
      rol: user.rol,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token');
  return { message: 'Sesión cerrada correctamente' };
}
}
