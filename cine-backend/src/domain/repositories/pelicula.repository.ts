import { Pelicula } from '../entities/pelicula.entity';

export abstract class PeliculaRepository {
  abstract crear(pelicula: Pelicula): Promise<Pelicula>;
  abstract buscarPorId(id: number): Promise<Pelicula | null>;
  abstract listar(): Promise<Pelicula[]>;
  abstract actualizar(id: number, pelicula: Partial<Pelicula>): Promise<Pelicula>;
  abstract inhabilitar(id: number): Promise<void>;
  abstract listarProximamente(): Promise<Pelicula[]>;

}
