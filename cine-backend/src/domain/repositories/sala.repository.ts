import { Sala } from '../entities/sala.entity';

export abstract class SalaRepository {
  abstract crear(sala: Sala): Promise<Sala>;
  abstract obtenerTodas(): Promise<Sala[]>;
}
