import { Funcion } from '../entities/funcion.entity';

export abstract class FuncionRepository {
  abstract crear(funcion: Funcion): Promise<Funcion>;
  abstract buscarPorPelicula(peliculaId: string): Promise<Funcion[]>;
  abstract obtenerPorId(id: number): Promise<Funcion | null>;
  abstract obtenerTodas(): Promise<Funcion[]>;
  abstract save(funcion: Funcion): Promise<Funcion>;

}