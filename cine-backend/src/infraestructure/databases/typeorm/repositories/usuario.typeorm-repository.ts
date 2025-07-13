import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from 'src/domain/repositories/usuario.repository';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioMapper } from 'src/infraestructure/mappers/usuario.mapper';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {}

  async crear(usuario: Usuario): Promise<Usuario> {
    const ormEntity = UsuarioMapper.toOrmEntity(usuario);
    const guardado = await this.repo.save(ormEntity);
    return UsuarioMapper.toDomain(guardado);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const encontrado = await this.repo.findOne({ where: { email } });
    return encontrado ? UsuarioMapper.toDomain(encontrado) : null;
  }
  
    async obtenerTodos(): Promise<Usuario[]> {
    const usuariosOrm = await this.repo.find();
    return usuariosOrm.map(UsuarioMapper.toDomain);
  }
}
