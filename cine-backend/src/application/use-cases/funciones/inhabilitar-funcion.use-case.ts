import { Injectable, Inject , NotFoundException } from '@nestjs/common';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';

@Injectable()
export class InhabilitarFuncionUseCase {
  constructor(@Inject('FuncionRepository')private readonly funcionRepository: FuncionRepository) {}

  async execute(id: number): Promise<void> {
    const funcion = await this.funcionRepository.obtenerPorId(id);
    if (!funcion) {
      throw new NotFoundException(`La función con id ${id} no existe`);
    }

    funcion.activo = false;
    await this.funcionRepository.save(funcion);
  }
}
