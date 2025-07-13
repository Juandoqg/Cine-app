import { Inject } from '@nestjs/common';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';

export class HabilitarFuncionUseCase {
  constructor(
    @Inject('FuncionRepository') 
    private readonly funcionRepo: FuncionRepository,
  ) {}

  async execute(id: number): Promise<Funcion> {
    const funcion = await this.funcionRepo.obtenerPorId(id);

    if (!funcion) {
      throw new Error('Función no encontrada');
    }

    funcion.activo = true;

    await this.funcionRepo.save(funcion);

    return funcion;
  }
}
