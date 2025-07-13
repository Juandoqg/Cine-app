
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioOrmEntity } from 'src/infraestructure/databases/typeorm/entities/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from 'src/infraestructure/databases/typeorm/repositories/usuario.typeorm-repository';

import { UsuariosController } from '../controllers/usuarios.controller';

import { ObtenerUsuariosUseCase } from 'src/application/use-cases/usuarios/get-all-usuarios.use-case';
import { InhabilitarUsuarioUseCase } from 'src/application/use-cases/usuarios/inhabilitar-usuarios.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuariosController],
  providers: [
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioTypeOrmRepository,
    },
    ObtenerUsuariosUseCase,
    InhabilitarUsuarioUseCase,
  ],
})
export class UsuariosModule {}
