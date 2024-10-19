import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Signature } from './signature.entity';

@Entity()
export class Task {
  @PrimaryColumn('uuid')
  task_id: string;
  @Column()
  task_name: string;

  @Column({ type: 'date' })
  date_finish: Date;

  @Column({ default: false })
  expired: boolean;

  @ManyToOne(() => Signature, (signs) => signs.tasks)
  signature: Signature;
}
