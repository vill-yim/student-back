import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Student } from './student/entities/student.entity';
import { Task } from './student/entities/task.entity';
import { Signature } from './student/entities/signature.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    /*
     if (connectionName === 'orders') {
      return {
        type: 'postgres',
        name: this.configService.get<string>('DB_ORDERS'),
        host: this.configService.get<string>('DB_HOST_LOCAL'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_SELETED'),
        entities: [Associate, MetadataAssociate, Business],
        synchronize: true,
      };
    }
     */

    return {
      type: this.configService.get<any>('DB_TYPE'),
      name: this.configService.get<string>('DB_NAME'),
      host: this.configService.get<string>('DB_HOST_LOCAL'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_SELETED'),
      entities: [Student, Signature, Task],
      synchronize: true,
    };
  }
}
