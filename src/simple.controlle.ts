import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller()
export class Landing {
  constructor() {}

  @Get()
  saludo() {
    return 'hola mundo';
  }
}
