import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentRepository } from '../repository/student.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginStudent } from '../dto/loginStudent.dto';

@Injectable()
export class StudentService {
  constructor(
    private jwtService: JwtService,
    private readonly studentRepository: StudentRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const req = await this.studentRepository.createStudent(createStudentDto);

    if (req.status !== HttpStatus.ACCEPTED)
      return { error: 'Hubo un problema al crear usuario!' };

    return {
      token: await this.jwtService.signAsync(req),
      status: HttpStatus.ACCEPTED,
    };
  }

  async login(login: LoginStudent) {
    const req = await this.studentRepository.login(login);

    if (req.status !== HttpStatus.ACCEPTED) {
      if (req.status === HttpStatus.INTERNAL_SERVER_ERROR)
        return { error: 'Contraseña incorrecta!', status: req.status };
      if (req.status === HttpStatus.NOT_FOUND)
        return { error: 'Estudiante no existe!', status: req.status };
    }

    return {
      token: await this.jwtService.signAsync(req),
      status: HttpStatus.ACCEPTED,
    };
  }

  async allDataStudent(student_id: string) {
    return await this.studentRepository.allDataStudent(student_id);
  }

  async studentsAll() {
    return this.studentRepository.studentsAll();
  }
}
