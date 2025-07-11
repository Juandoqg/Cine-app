import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaOrmEntity } from 'src/infraestructure/databases/typeorm/entities/venta.orm-entity';
import { VentaTypeOrmRepository } from '../../infraestructure/databases/typeorm/repositories/venta.typeorm-repository';
import { CrearVentaUseCase } from '../../application/use-cases/ventas/crear-venta.use-case';
import { VentaController } from '../../interfaces/controllers/venta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VentaOrmEntity])],
  controllers: [VentaController],
  providers: [
    {
      provide: 'VentaRepository',
      useClass: VentaTypeOrmRepository,
    },
    CrearVentaUseCase,
  ],
})
export class VentasModule {}
