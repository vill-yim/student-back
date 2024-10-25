import { Module } from '@nestjs/common';
import { ConfigDatabase } from './configdatabase';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { Landing } from './simple.controlle';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.developmen.local'],
      isGlobal: true,
    }),
    ConfigDatabase,
    StudentModule,
  ],
  controllers: [Landing],
})
export class AppModule {}
