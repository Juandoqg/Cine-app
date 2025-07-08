import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {}

  async crear(usuario: Usuario): Promise<Usuario> {
    const nuevo = this.repo.create(usuario);
    const guardado = await this.repo.save(nuevo);
    return guardado;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await this.repo.findOne({ where: { email } });
  }
}
