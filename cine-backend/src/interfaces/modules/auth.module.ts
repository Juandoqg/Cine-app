import { Module } from '@nestjs/common';
import { JwtModule , JwtService} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '../controllers/auth.controller';
import { UsuarioOrmEntity } from '../../infraestructure/databases/typeorm/entities/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from '../../infraestructure/databases/typeorm/repositories/usuario.typeorm-repository';

import { RegisterUsuarioUseCase } from 'src/application/use-cases/auth/register-usuario.use-case';
import { LoginUsuarioUseCase }    from 'src/application/use-cases/auth/login-usuarios.use-case';
import { UsuarioRepository }       from 'src/domain/repositories/usuario.repository';
import { JwtStrategy } from '../../infraestructure/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([UsuarioOrmEntity]),  
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: config.get<string>('jwt.expires_in') || '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioTypeOrmRepository,
    },
    {
      provide: RegisterUsuarioUseCase,
      useFactory: (repo: UsuarioRepository) =>
        new RegisterUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
    {
      provide: LoginUsuarioUseCase,
      useFactory: (repo: UsuarioRepository, jwt: JwtService) =>
        new LoginUsuarioUseCase(repo, jwt),
      inject: ['UsuarioRepository', JwtService],
    },
  ],
})
export class AuthModule {}
