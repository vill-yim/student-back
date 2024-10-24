import { Task } from './task.entity';
import { Student } from './student.entity';
import { IsNotEmpty, IsDecimal } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  grade_id: string;

  @Column()
  @IsNotEmpty()
  student_id: string;

  @Column()
  @IsNotEmpty()
  task_id: string;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  @IsDecimal({ decimal_digits: '1', force_decimal: true })
  grade: number;

  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @ManyToOne(() => Task, (task) => task.grades)
  task: Task;
}
