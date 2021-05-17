import { registerAs } from '@nestjs/config';
import { IAppConfig } from './configs.interface';

export const appConfig = registerAs('app', (): IAppConfig => {
  const config: IAppConfig = {
    port: Number(process.env['PORT']),
    nodeEnv: process.env['NODE_ENV'] || 'development',
    isDev: false,
  };
  config.isDev = /^development$/.test(config.nodeEnv);

  return config;
});
