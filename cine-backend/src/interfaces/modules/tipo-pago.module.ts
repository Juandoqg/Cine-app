import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPagoOrmEntity } from 'src/infraestructure/databases/typeorm/entities/tipo-pago.orm-entity';
import { TipoPagoTypeOrmRepository} from 'src/infraestructure/databases/typeorm/repositories/tipo-pago.typeorm-repository';
import { TipoPagoController } from '../controllers/tipo-pago.controller';
import { GetAllTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/get-all-tipo-pago.use-case';
import { CreateTipoPagoUseCase } from 'src/application/use-cases/tipo-pago/crear-tipo-pago.use-case';


@Module({
  imports: [TypeOrmModule.forFeature([TipoPagoOrmEntity])],
  controllers: [TipoPagoController],
  providers: [
    {
      provide: 'TipoPagoRepository',
      useClass: TipoPagoTypeOrmRepository,
    },
    GetAllTipoPagoUseCase,
    CreateTipoPagoUseCase
  ],
})
export class TipoPagoModule {}
