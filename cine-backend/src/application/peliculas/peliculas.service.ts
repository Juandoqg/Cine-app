import { Injectable } from '@nestjs/common';
import { CreatePeliculaUseCase } from '../use-cases/create-pelicula.use-case';

@Injectable()
export class PeliculasService {
  constructor(private readonly crearUC: CreatePeliculaUseCase) {}

  async crearPelicula(dto: any) {
    return this.crearUC.execute(dto);
  }
}
