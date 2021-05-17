import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config.module';
import { appConfig } from './configs';
import { ConfigService } from '@nestjs/config';

const configs = [appConfig];

@Module({
  imports: [
    EnvConfigModule.register({
      isGlobal: true,
      load: configs,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
