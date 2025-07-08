import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeliculaOrmEntity } from '../databases/typeorm/entities/pelicula.orm-entity';
import { PeliculasController } from '../controllers/peliculas.controller';
import { PeliculaTypeOrmRepository } from '../databases/typeorm/repositories/pelicula.typeorm-repository';

import { CreatePeliculaUseCase } from 'src/application/use-cases/peliculas/create-pelicula.use-case';

import { GetAllPeliculasUseCase } from 'src/application/use-cases/peliculas/get-all-peliculas.use-case';

import { GetPeliculaByIdUseCase } from 'src/application/use-cases/peliculas/get-peliculas-by-id.use-case';

import { UpdatePeliculaUseCase } from 'src/application/use-cases/peliculas/update-pelicula.use-case';

import { InhabilitarPeliculaUseCase } from 'src/application/use-cases/peliculas/inhabilitar-pelicula.use-case';


@Module({
  imports: [TypeOrmModule.forFeature([PeliculaOrmEntity])],
  controllers: [PeliculasController],
  providers: [

    {
      provide: 'PeliculaRepository',
      useClass: PeliculaTypeOrmRepository,
    },
    {
      provide: CreatePeliculaUseCase,
      useFactory: (repo) => new CreatePeliculaUseCase(repo),
      inject: ['PeliculaRepository'],
      
    },
    {
      provide: GetAllPeliculasUseCase,
      useFactory: (repo) => new GetAllPeliculasUseCase(repo),
      inject: ['PeliculaRepository'],
    },
    {
      provide: GetPeliculaByIdUseCase,
      useFactory: (repo) => new GetPeliculaByIdUseCase(repo),
      inject: ['PeliculaRepository'],
    },
    {
      provide: UpdatePeliculaUseCase,
      useFactory: (repo) => new UpdatePeliculaUseCase(repo),
      inject: ['PeliculaRepository'],
    },
     {
      provide: InhabilitarPeliculaUseCase,
      useFactory: (repo) => new InhabilitarPeliculaUseCase(repo),
      inject: ['PeliculaRepository'],
    },
  ],
})
export class PeliculasModule {}
