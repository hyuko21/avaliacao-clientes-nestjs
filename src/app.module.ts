import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './modules';

@Module({
  imports: [ClientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
