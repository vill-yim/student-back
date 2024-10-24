import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './typeormservice';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService | procees.env,
    }),
  ],
})
export class ConfigDatabase {}
