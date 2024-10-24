import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { Task } from './task.entity';
import { Student } from './student.entity';

@Entity()
export class Signature {
  @PrimaryGeneratedColumn('uuid')
  signature_id: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ type: 'int', nullable: true })
  credits: number;

  @ManyToMany(() => Student, (student) => student.signatures)
  students: Student[];

  @OneToMany(() => Task, (task) => task.signature)
  tasks: Task[];
}
