import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Length, IsOptional } from 'class-validator';
import { Signature } from './signature.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  student_id: string;

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

  @Column({ unique: true })
  @IsNotEmpty()
  number_identify: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  profile_img: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => Signature, (signa) => signa.signature_id)
  final_grade: Signature[];
}
