import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeliculaOrmEntity } from '../databases/typeorm/entities/pelicula.orm-entity';
import { PeliculasController } from '../controllers/peliculas.controller';
import { PeliculaTypeOrmRepository } from '../databases/typeorm/repositories/pelicula.typeorm-repository';

import { CreatePeliculaUseCase } from 'src/application/use-cases/create-pelicula.use-case';
import { PeliculasService } from 'src/application/peliculas/peliculas.service';

import { GetAllPeliculasUseCase } from 'src/application/use-cases/get-all-peliculas.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PeliculaOrmEntity])],
  controllers: [PeliculasController],
  providers: [
    PeliculasService,
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
  ],
})
export class PeliculasModule {}
