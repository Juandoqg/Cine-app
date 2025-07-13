import { Inject } from '@nestjs/common';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';
import { Funcion } from '../../../domain/entities/funcion.entity';

export class ObtenerFuncionesUseCase {
   constructor(
    @Inject('FuncionRepository')  
    private readonly funcionRepo: FuncionRepository
  ) {}

  async execute(): Promise<Funcion[]> {
    return this.funcionRepo.obtenerTodas();
  }
}
