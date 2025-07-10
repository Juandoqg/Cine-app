import { Injectable, Inject } from '@nestjs/common';
import { SalaRepository } from '../../../domain/repositories/sala.repository';
import { Sala } from '../../../domain/entities/sala.entity';

@Injectable()
export class ObtenerSalaPorIdUseCase {
 constructor(
     @Inject('SalaRepository')
     private readonly salaRepo: SalaRepository
   ) {}
    async execute(id: number): Promise<Sala> {
    const sala = await this.salaRepo.obtenerPorId(id);
    if (!sala) {
      throw new Error(`Sala con ID ${id} no encontrada`);
    }
    return sala;
  }
}
