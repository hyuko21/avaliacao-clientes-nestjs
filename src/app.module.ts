import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './config/core.module';
import { NoCacheMiddleware } from './middlewares';
import { ClientesModule, LojasModule } from './modules';
import { SWAGGER_API_ROOT } from './swagger/constants';
import { ColaboradoresModule } from './modules/colaboradores/colaboradores.module';

@Module({
  imports: [CoreModule, ClientesModule, LojasModule, ColaboradoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoCacheMiddleware).forRoutes(SWAGGER_API_ROOT);
  }
}
