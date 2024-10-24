import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { imgToUrl } from 'src/utils/imgToUrl';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { hashPassword } from 'src/utils/hashpassword';
import { LoginStudent } from '../dto/loginStudent.dto';
import { UUID } from 'crypto';

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
      const profile: any = await imgToUrl(profile_img);
      const password = await hashPassword(req.password);
      const Student: CreateStudentDto = {
        name: req.name,
        lastname: req.lastname,
        type_identify: req.type_identify,
        number_identify: req.number_identify,
        email: req.email,
        profile_img: profile,
        password: password,
      };

      const res = await this.studentService.createStudent(Student);
      return res;
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

    const res = await this.studentService.login(login);
    return res;
  }

  @Get(`profile/:id`)
  async alldataStudent(@Param('id') id: UUID) {
    return await this.studentService.allDataStudent(id.toString());
  }

  @Get('students')
  async studentsAll() {
    return await this.studentService.studentsAll();
  }
}
