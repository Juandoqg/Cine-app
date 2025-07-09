import { SalaRepository } from "src/domain/repositories/sala.repository";
import { Sala } from "src/domain/entities/sala.entity";
import { Injectable, Inject } from '@nestjs/common';


@Injectable()
export class GetAllSalasUseCase {
  constructor(
    @Inject('SalaRepository')
    private readonly salaRepo: SalaRepository
  ) {}

  async execute(): Promise<Sala[]> {
    return await this.salaRepo.obtenerTodas();
  }
}
