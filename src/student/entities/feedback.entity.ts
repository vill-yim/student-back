import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Student } from './student.entity';
import { Signature } from './signature.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  feedback_id: string;

  @Column()
  @IsNotEmpty()
  message: string;

  @ManyToOne(() => Student, (student) => student.feedbacks)
  student: Student;

  @ManyToOne(() => Signature, (signature) => signature.feedbacks)
  signature: Signature;
}
