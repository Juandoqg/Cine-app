import { SalaRepository } from 'src/domain/repositories/sala.repository';
import { SalaModelDto } from 'src/application/dto/SalaModelDto';
import { Sala} from 'src/domain/entities/sala.entity';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CrearSalaUseCase {
 constructor(
    @Inject('SalaRepository')
    private readonly salaRepo: SalaRepository
  ) {}
  async execute(dto: SalaModelDto): Promise<Sala> {
    const sala = new Sala (dto.nombre, dto.capacidad);
    return await this.salaRepo.crear(sala);
  }
}
