import { Column, Entity, OneToMany, PrimaryColumn, ManyToMany } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { Task } from './task.entity';
import { Student } from './student.entity';

@Entity()
export class Signature {
  @PrimaryColumn('uuid')
  signature_id: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  lastname: string;

  @Column()
  @IsNotEmpty()
  type_identify: string;

  @Column()
  @IsNotEmpty()
  number_identify: string;

  @Column({ default: false })
  approved: boolean;

  @ManyToMany(() => Student, (student) => student.final_grade)
  calification: Student;

  @OneToMany(() => Task, (tasks) => tasks.task_id)
  tasks: Task[];
}
