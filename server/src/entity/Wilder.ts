import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import { Grade } from './Grade';

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true, length: 100, type: 'varchar'})
  city: string |null;

  @Column({nullable: true, length: 500, type: 'varchar'})
  bio: string | null;

  @OneToMany(()=> Grade, grade => grade.wilder)
  grades: Grade[];

  
}