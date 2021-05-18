import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreModule } from './config/core.module';
import { NoCacheMiddleware } from './middlewares';
import {
  ClientesModule,
  TransacoesModule,
  LojasModule,
  ColaboradoresModule,
} from './modules';
import { SWAGGER_API_ROOT } from './swagger/constants';

@Module({
  imports: [
    CoreModule,
    ClientesModule,
    TransacoesModule,
    LojasModule,
    ColaboradoresModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoCacheMiddleware).forRoutes(SWAGGER_API_ROOT);
  }
}
