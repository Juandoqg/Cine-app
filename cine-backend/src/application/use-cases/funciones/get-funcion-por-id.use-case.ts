import { Injectable , Inject} from '@nestjs/common';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';
import { Funcion } from 'src/domain/entities/funcion.entity';

@Injectable()
export class ObtenerFuncionPorIdUseCase {
  constructor(
    @Inject('FuncionRepository')  
    private readonly funcionRepo: FuncionRepository
  ) {}

  async execute(id: number) {
    return this.funcionRepo.obtenerPorId(id);
  }
}