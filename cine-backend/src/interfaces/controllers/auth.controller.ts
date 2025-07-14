import { Controller, Post, Body, HttpCode,Res , Req, Get} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/auth/register-usuario.use-case';
import { LoginDto } from 'src/application/dto/LoginDto';
import { LoginUsuarioUseCase } from 'src/application/use-cases/auth/login-usuarios.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infraestructure/guards/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/infraestructure/guards/google-auth.guard';
import { Request as ExpressRequest, Response } from 'express';



@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUsuarioUseCase,
    private readonly loginUseCase: LoginUsuarioUseCase
  ) {}


  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: Object }) 
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  async register(@Body() body: any) {
    return this.registerUseCase.execute(body);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar sesión con email y contraseña' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso y cookie establecida' })
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
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiCookieAuth('access_token')
  @ApiResponse({ status: 200, description: 'Datos del usuario autenticado' })
  getProfile(@Req() req: Request) {
    const user = req['user'];
    return {
      id: user.sub,
      email: user.email,
      rol: user.rol,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión y eliminar cookie JWT' })
  @ApiCookieAuth('access_token')
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token');
  return { message: 'Sesión cerrada correctamente' };
}
 
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Iniciar autenticación con Google' })
  @ApiResponse({ status: 200, description: 'Redirección a Google' })
  googleAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    const returnUrl = req.query.returnUrl as string || 'http://localhost:4200/';
    res.cookie('return_url', returnUrl, {
      maxAge: 5 * 60 * 1000,
      httpOnly: false, 
      sameSite: 'lax',
    });

    res.end(); 
  }


  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Callback de autenticación de Google' })
  @ApiResponse({ status: 302, description: 'Redirección con login exitoso o error' })
async googleAuthRedirect(@Req() req: ExpressRequest, @Res() res: Response) {
  const user = req.user as any;

  if (!user?.email) {
    return res.redirect('http://localhost:4200/login?error=unauthorized');
  }

  const token = await this.loginUseCase.executeGoogle(user.email);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hora
  });

  const returnUrl = user.returnUrl || 'http://localhost:4200/';
  const separator = returnUrl.includes('?') ? '&' : '?';

  return res.redirect(`${decodeURIComponent(returnUrl)}${separator}login=success`);
}

@Get('google/redirect')
@UseGuards(GoogleAuthGuard)
@ApiOperation({ summary: 'Redirección segura con token desde Google' })
@ApiResponse({ status: 302, description: 'Redirección con login exitoso o error' })
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

  const returnUrl = req.query.returnUrl as string || 'http://localhost:4200/';
  const decodedReturnUrl = decodeURIComponent(returnUrl);
  const separator = decodedReturnUrl.includes('?') ? '&' : '?';

  return res.redirect(`${decodedReturnUrl}${separator}login=success`);
}
}
