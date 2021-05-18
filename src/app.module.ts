import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './config/core.module';
import { NoCacheMiddleware } from './middlewares';
import { ClientesModule, TransacoesModule, LojasModule } from './modules';
import { SWAGGER_API_ROOT } from './swagger/constants';

@Module({
  imports: [CoreModule, ClientesModule, TransacoesModule, LojasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoCacheMiddleware).forRoutes(SWAGGER_API_ROOT);
  }
}
