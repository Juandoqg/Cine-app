import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuncionOrmEntity } from '../databases/typeorm/entities/funcion.orm-entity';
import { TypeOrmFuncionRepository } from '../databases/typeorm/repositories/funcion.typeorm-repository';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';

import { FuncionesController } from '../controllers/funciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FuncionOrmEntity])],
  controllers: [FuncionesController],
  providers: [
    CreateFuncionUseCase,
    {
      provide: 'FuncionRepository',
      useClass: TypeOrmFuncionRepository,
    },
  ],
})
export class FuncionesModule {}
