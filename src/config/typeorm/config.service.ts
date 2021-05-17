import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { resolve } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      schema: this.configService.get<string>('DB_SCHEMA'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [
        resolve(
          __dirname,
          '..',
          '..',
          'modules',
          '**',
          'data',
          'entities',
          '*.{ts,js}',
        ),
      ],
    };
  }
}
