import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../controllers/auth.controller';
import { UsuarioOrmEntity } from '../databases/typeorm/entities/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from '../databases/typeorm/repositories/usuario.typeorm-repository';
import { RegisterUsuarioUseCase } from 'src/application/use-cases/usuarios/register-usuario.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioTypeOrmRepository,
    },
    {
      provide: RegisterUsuarioUseCase,
      useFactory: (repo) => new RegisterUsuarioUseCase(repo),
      inject: ['UsuarioRepository'],
    },
  ],
})
export class UsuariosModule {}
