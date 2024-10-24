import { LoginStudent } from './../dto/loginStudent.dto';
import { CreateStudentDto } from './../dto/create-student.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Signature } from '../entities/signature.entity';
import { compare } from 'bcrypt';
import { StudentRes } from '../dto/resStudent.dto';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Signature)
    private readonly signatureRepository: Repository<Signature>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createStudent(createStudent: CreateStudentDto) {
    try {
      const req: CreateStudentDto =
        await this.studentRepository.save(createStudent);

      const StudentCreate: StudentRes = {
        student_id: req.student_id,
        name: req.name,
        lastname: req.lastname,
        type_identify: req.type_identify,
        number_identify: req.number_identify,
        profile_img: req.profile_img,
        email: req.email,
        approved: req.approved,
        active: req.active,
      };

      if (!req) return { status: HttpStatus.NOT_FOUND };

      return { token: StudentCreate, status: HttpStatus.ACCEPTED };
    } catch (error) {
      return error;
    }
  }

  async login(login: LoginStudent) {
    const req = await this.studentRepository.findOne({
      where: { number_identify: login.number_identify },
    });
    if (!req) return { status: HttpStatus.NOT_FOUND };

    const verified: boolean = await compare(login.password, req.password);
    if (!!verified) {
      const Studentres: StudentRes = {
        student_id: req.student_id,
        name: req.name,
        lastname: req.lastname,
        type_identify: req.type_identify,
        number_identify: req.number_identify,
        email: req.email,
        profile_img: req.profile_img,
        approved: req.approved,
        active: req.active,
      };

      return { token: Studentres, status: HttpStatus.ACCEPTED };
    } else {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async allDataStudent(student_id: string) {
    const student = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.grades', 'grade')
      .leftJoinAndSelect('grade.task', 'task')
      .leftJoinAndSelect('task.signature', 'signature')
      .where('student.student_id = :student_id', { student_id })
      .getOne();

    return student;
  }

  async studentsAll() {
    return this.studentRepository.find();
  }
}
