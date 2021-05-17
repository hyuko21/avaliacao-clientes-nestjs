import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './config/core.module';
import { ClientesModule } from './modules';

@Module({
  imports: [CoreModule, ClientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
