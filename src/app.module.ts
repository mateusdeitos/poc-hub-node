import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { OrderNotificationController } from './order/order-notification.controller';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot(),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'orders_receive_notification_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq-management/%2f',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [AppController, OrderNotificationController],
  providers: [AppService],
})
export class AppModule {}
