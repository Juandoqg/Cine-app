import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Funcion } from './funcion.entity';

@Entity('salas')
export class SalaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  //@OneToMany(() => Funcion, funcion => funcion.sala)
  //funciones: Funcion[];
}
