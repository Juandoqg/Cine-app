import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuncionOrmEntity } from '../../infraestructure/databases/typeorm/entities/funcion.orm-entity';
import { TypeOrmFuncionRepository } from '../../infraestructure/databases/typeorm/repositories/funcion.typeorm-repository';
import { CreateFuncionUseCase } from 'src/application/use-cases/funciones/create-funcion.use-case';

import { FuncionesController } from '../controllers/funciones.controller';
import { GetFuncionesPorPeliculaUseCase } from 'src/application/use-cases/funciones/get-funcion-por-pelicula.use-case';
import { SalaOrmEntity } from '../../infraestructure/databases/typeorm/entities/sala.orm-entity';
import { PeliculaOrmEntity} from '../../infraestructure/databases/typeorm/entities/pelicula.orm-entity';
import { ObtenerFuncionPorIdUseCase } from 'src/application/use-cases/funciones/get-funcion-por-id.use-case';
import { ObtenerFuncionesUseCase } from 'src/application/use-cases/funciones/get-all-funcion.use-case';
import { InhabilitarFuncionUseCase } from 'src/application/use-cases/funciones/inhabilitar-funcion.use-case';

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
    ObtenerFuncionPorIdUseCase,
    ObtenerFuncionesUseCase,
    InhabilitarFuncionUseCase
  ],
})
export class FuncionesModule {}
