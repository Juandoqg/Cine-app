import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FuncionOrmEntity } from './funcion.orm-entity';

@Entity('salas')
export class SalaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

 @OneToMany(() => FuncionOrmEntity, funcion => funcion.sala)
funciones: FuncionOrmEntity[];

}
