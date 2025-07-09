// src/infraestructure/modules/salas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaOrmEntity } from '../databases/typeorm/entities/sala.orm-entity';
import { SalaTypeOrmRepository } from '../databases/typeorm/repositories/sala.typeorm-repository';
import { CrearSalaUseCase } from 'src/application/use-cases/salas/create-sala.use-case';
import { SalasController } from '../controllers/salas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SalaOrmEntity])],
  controllers: [SalasController],
  providers: [
    // ✅ Registrar el repositorio con un token personalizado
    {
      provide: 'SalaRepository',
      useClass: SalaTypeOrmRepository,
    },
    // ✅ Inyectar el use case, que depende del token anterior
    CrearSalaUseCase,
  ],
})
export class SalasModule {}
