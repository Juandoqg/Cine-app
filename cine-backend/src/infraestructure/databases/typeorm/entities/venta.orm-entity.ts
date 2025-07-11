import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { UsuarioOrmEntity } from './usuario.orm-entity';
import { FuncionOrmEntity } from './funcion.orm-entity';
import { TipoPagoOrmEntity } from './tipo-pago.orm-entity';

@Entity('ventas')
export class VentaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteId: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'clienteId' })
  cliente: UsuarioOrmEntity;

  @Column()
  funcionId: number;

  @ManyToOne(() => FuncionOrmEntity)
  @JoinColumn({ name: 'funcionId' })
  funcion: FuncionOrmEntity;

  @Column()
  tipoPagoId: number;

  @ManyToOne(() => TipoPagoOrmEntity)
  @JoinColumn({ name: 'tipoPagoId' })
  tipoPago: TipoPagoOrmEntity;

  @Column()
  cantidadTickets: number;

  @Column()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;
}
