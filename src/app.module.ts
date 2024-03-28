import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from './modules/integration/integration.module';

@Module({
  imports: [ConfigModule.forRoot(), IntegrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
