import { Module } from '@nestjs/common';
import { ConfigDatabase } from './configdatabase';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    ConfigDatabase,
    StudentModule,
  ],
})
export class AppModule {}
