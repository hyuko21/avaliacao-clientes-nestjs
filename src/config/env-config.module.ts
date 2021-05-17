import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

export class EnvConfigModule {
  static register(options?: ConfigModuleOptions): DynamicModule {
    const nodeEnv = process.env['NODE_ENV'] || 'development';
    const envFilePath = `.env.${nodeEnv}`;

    return ConfigModule.forRoot({
      ...options,
      expandVariables: true,
      envFilePath,
    });
  }
}
