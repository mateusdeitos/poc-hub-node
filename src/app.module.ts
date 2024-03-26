import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { OrderNotificationController } from './order/order-notification.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OrderModule, ConfigModule.forRoot()],
  controllers: [AppController, OrderNotificationController],
  providers: [AppService],
})
export class AppModule {}
