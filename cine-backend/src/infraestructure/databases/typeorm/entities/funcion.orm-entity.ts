
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { SalaOrmEntity } from './sala.orm-entity';
import { PeliculaOrmEntity } from './pelicula.orm-entity';

@Entity('funciones')
export class FuncionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  hora: string;

  @Column('decimal', { precision: 8, scale: 2 })
  precio: number;

  @Column({ default: true }) 
  activo: boolean;


  @ManyToOne(() => SalaOrmEntity, { eager: true })
  sala: SalaOrmEntity;

  @ManyToOne(() => PeliculaOrmEntity, { eager: true })
  @JoinColumn({ name: 'peliculaId' })
  pelicula: PeliculaOrmEntity;
}
