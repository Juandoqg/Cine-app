import { Usuario } from '../entities/usuario.entity';

export abstract class UsuarioRepository {
  abstract crear(usuario: Usuario): Promise<Usuario>;
  abstract buscarPorEmail(email: string): Promise<Usuario | null>;
  abstract obtenerTodos(): Promise<Usuario[]>;

}
