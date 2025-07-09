
import { FuncionModelDto } from 'src/application/dto/FuncionModelDto';
import { FuncionRepository } from 'src/domain/repositories/funcion.repository';
import { Funcion } from 'src/domain/entities/funcion.entity';
import { Inject , Injectable} from '@nestjs/common';


@Injectable()
export class CreateFuncionUseCase {
  constructor(@Inject('FuncionRepository')private readonly funcionRepo: FuncionRepository) {}

  async execute(dto: FuncionModelDto): Promise<Funcion> {
    const funcion = new Funcion(
      0,
      dto.peliculaId,
      dto.salaId,
      dto.fecha,
      dto.hora,
      dto.precio
    );

    return await this.funcionRepo.crear(funcion);
  }
}
