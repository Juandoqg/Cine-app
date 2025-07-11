import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaOrmEntity } from '../../infraestructure/databases/typeorm/entities/sala.orm-entity';
import { SalaTypeOrmRepository } from '../../infraestructure/databases/typeorm/repositories/sala.typeorm-repository';
import { CrearSalaUseCase } from 'src/application/use-cases/salas/create-sala.use-case';
import { SalasController } from '../controllers/salas.controller';
import { GetAllSalasUseCase } from 'src/application/use-cases/salas/get-all-salas.use-cases';
import { ObtenerSalaPorIdUseCase } from 'src/application/use-cases/salas/get-sala-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SalaOrmEntity])],
  controllers: [SalasController],
  providers: [
    {
      provide: 'SalaRepository',
      useClass: SalaTypeOrmRepository,
    },
   
    CrearSalaUseCase,
    GetAllSalasUseCase,
    ObtenerSalaPorIdUseCase,
  ],
})
export class SalasModule {}
