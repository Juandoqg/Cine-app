
import { Funcion } from '../entities/funcion.entity';

export abstract class FuncionRepository {
  abstract crear(funcion: Funcion): Promise<Funcion>;
  abstract obtenerTodas(): Promise<Funcion[]>;
  abstract buscarPorDia(fecha: Date): Promise<Funcion | null>;
}
