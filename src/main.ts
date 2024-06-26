import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using pipes globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
  console.log('listening');
}
bootstrap();

// main-appmodule+bootstrap
// appmodule=import=(database+employeemodule), app-Controller, app-Services
// employeemodule= employee-Controller,employee-sevices,employee-schema
