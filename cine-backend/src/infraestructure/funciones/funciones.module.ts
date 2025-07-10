import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuncionOrmEntity } from '../databases/typeorm/entities/funcion.orm-entity';
import { TypeOrmFuncionRepository } from '../databases/typeorm/repositories/funcion.typeorm-repository';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';

import { FuncionesController } from '../../interfaces/controllers/funciones.controller';
import { GetFuncionesPorPeliculaUseCase } from 'src/application/use-cases/funciones/get-funcion-por-pelicula.use-case';
import { SalaOrmEntity } from '../databases/typeorm/entities/sala.orm-entity';
import { PeliculaOrmEntity} from '../databases/typeorm/entities/pelicula.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([FuncionOrmEntity, SalaOrmEntity, PeliculaOrmEntity])],
  controllers: [FuncionesController],
  providers: [
    {
      provide: 'FuncionRepository', 
      useClass: TypeOrmFuncionRepository,
    },
    CreateFuncionUseCase,
    GetFuncionesPorPeliculaUseCase,
  ],
})
export class FuncionesModule {}
