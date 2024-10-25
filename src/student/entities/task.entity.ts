import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Signature } from './signature.entity';
import { Grade } from './grade.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;

  @Column()
  task_name: string;

  @Column({ type: 'date' })
  date_finish: Date;

  @Column({ default: false })
  expired: boolean;

  @ManyToOne(() => Signature, (signature) => signature.tasks)
  signature: Signature;

  @OneToMany(() => Grade, (grade) => grade.task)
  grades: Grade[];
}
