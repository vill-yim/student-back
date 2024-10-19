import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { imgToUrl } from 'src/utils/imgToUrl';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { hashPassword } from 'src/utils/hashpassword';
import { LoginStudent } from '../dto/loginStudent.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('profile_img'))
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() profile_img: any,
  ) {
    try {
      const req = Object.assign({}, createStudentDto);
      const profile = await imgToUrl(profile_img);
      const password = await hashPassword(req.password);
      const Student: CreateStudentDto = {
        name: req.name,
        lastname: req.lastname,
        type_identify: req.type_identify,
        number_identify: req.number_identify,
        profile_img: profile,
        password: password,
      };

      return await this.studentService.createStudent(Student);
    } catch (error) {
      return { error: `${error}`, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @Post('login')
  @UseInterceptors(FileInterceptor(''))
  async login(@Body() loginStudent: LoginStudent) {
    const login: LoginStudent = {
      number_identify: loginStudent.number_identify,
      password: loginStudent.password,
    };

    return this.studentService.login(login);
  }

  @Get('students')
  async studentsAll() {
    return await this.studentService.studentsAll();
  }
}
