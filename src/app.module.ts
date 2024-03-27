import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [OrderModule, ConfigModule.forRoot(), IntegrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
