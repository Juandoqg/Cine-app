import { Controller, Post, Body, HttpCode,Res , Req, Get} from '@nestjs/common';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/auth/register-usuario.use-case';
import { LoginDto } from 'src/application/dto/LoginDto';
import { LoginUsuarioUseCase } from 'src/application/use-cases/auth/login-usuarios.use-case';
import { Response } from 'express'; 
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infraestructure/guards/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/infraestructure/guards/google-auth.guard';



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
      secure: true, 
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
 

@Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Redirecciona a Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;

    // Aquí puedes buscar si el usuario existe o crearlo
    const token = await this.loginUseCase.executeGoogle(user.email); // crea esta función o usa una lógica diferente

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    res.redirect('/'); // o redirige al frontend
  }

  @Get('google/redirect')
@UseGuards(GoogleAuthGuard)
async googleRedirect(@Req() req: Request, @Res() res: Response) {
  const user = (req as any).user;

  const token = await this.loginUseCase.executeGoogle(user.email);
    res.cookie('access_token', token, {
          httpOnly: true,
          secure: true, 
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 // 1 hora
        });
  return res.redirect(`http://localhost:4200/`);
}

}
