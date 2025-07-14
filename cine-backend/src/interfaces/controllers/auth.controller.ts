import { Controller, Post, Body, HttpCode,Res , Req, Get} from '@nestjs/common';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/auth/register-usuario.use-case';
import { LoginDto } from 'src/application/dto/LoginDto';
import { LoginUsuarioUseCase } from 'src/application/use-cases/auth/login-usuarios.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infraestructure/guards/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/infraestructure/guards/google-auth.guard';
import { Request as ExpressRequest, Response } from 'express';

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
  googleAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    const returnUrl = req.query.returnUrl as string || 'http://localhost:4200/';
    res.cookie('return_url', returnUrl, {
      maxAge: 5 * 60 * 1000,
      httpOnly: false, 
      sameSite: 'lax',
    });

    res.end(); // deja que el guard redirija a Google
  }
@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleAuthRedirect(@Req() req: ExpressRequest, @Res() res: Response) {
  const user = req.user as any;

  if (!user?.email) {
    return res.redirect('http://localhost:4200/login?error=unauthorized');
  }

  const token = await this.loginUseCase.executeGoogle(user.email);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: false, // en prod ponlo en true si usas HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hora
  });

  const returnUrl = user.returnUrl || 'http://localhost:4200/';
  const separator = returnUrl.includes('?') ? '&' : '?';

  return res.redirect(`${decodeURIComponent(returnUrl)}${separator}login=success`);
}

@Get('google/redirect')
@UseGuards(GoogleAuthGuard)
async googleRedirect(
  @Req() req: ExpressRequest,
  @Res() res: Response,
) {
  const user = req.user as any;

  if (!user?.email) {
    return res.redirect('http://localhost:4200/login?error=unauthorized');
  }

  const token = await this.loginUseCase.executeGoogle(user.email);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60,
  });

  // ✅ OBTENER returnUrl directamente desde la query
  const returnUrl = req.query.returnUrl as string || 'http://localhost:4200/';
  const decodedReturnUrl = decodeURIComponent(returnUrl);
  const separator = decodedReturnUrl.includes('?') ? '&' : '?';

  return res.redirect(`${decodedReturnUrl}${separator}login=success`);
}
}
