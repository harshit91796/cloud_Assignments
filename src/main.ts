import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';  // Import NestExpressApplication
import * as dotenv from 'dotenv';
import { GlobalExceptionsFilter } from './http-exception.filter';
import { CoreMiddlewaresConfig } from './config/core-middlewares.config';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  
  const middlewareConfig = new CoreMiddlewaresConfig(app);
  middlewareConfig.configure();
  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(3000);
  console.log('listening port 3000');
}
bootstrap();
