import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentController } from './controller/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Signature } from './entities/signature.entity';
import { Task } from './entities/task.entity';
import { StudentRepository } from './repository/student.repository';
import { JwtModule } from '@nestjs/jwt';
import { Grade } from './entities/grade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Signature, Task, Grade]),
    JwtModule.register({
      secret: 'mi_jwt_key',
      global: true,
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
