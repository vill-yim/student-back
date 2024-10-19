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
    if (req.status !== HttpStatus.CREATED) return { error: req };

    return this.jwtService.signAsync(req);
  }

  async login(login: LoginStudent) {
    const req = await this.studentRepository.login(login);

    if (req.status !== HttpStatus.ACCEPTED) {
      if (req.status === HttpStatus.INTERNAL_SERVER_ERROR)
        return { error: 'Contraseña incorrecta!' };
      if (req.status === HttpStatus.NOT_FOUND)
        return { error: 'Estudiante no existe!' };
    }

    return this.jwtService.signAsync(req);
  }

  async studentsAll() {
    return this.studentRepository.studentsAll();
  }
  async studentProfile() {}
}
