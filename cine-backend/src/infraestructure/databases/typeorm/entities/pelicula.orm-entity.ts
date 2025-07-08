import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('peliculas')
export class PeliculaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  categoria: string;

  @Column()
  trailerUrl: string;

  @Column()
  imagen: string;

  @Column({ type: 'date' })
  fechaEstreno: Date;

  @Column({ type: 'int' })
  duracion: number;

  @Column({ type: 'boolean', default: false })
  proximamente: boolean;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
