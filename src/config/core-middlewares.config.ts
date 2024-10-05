import { NestExpressApplication } from '@nestjs/platform-express';
import { INPUT_VALIDATION_PIPE } from './input-validation-pipe';

export class CoreMiddlewaresConfig {
  constructor(private readonly app: NestExpressApplication) {}

  configure(): void {
    this.app.useGlobalPipes(INPUT_VALIDATION_PIPE);

    this.app.setGlobalPrefix(process.env.SERVER_PREFIX);
  }
}
