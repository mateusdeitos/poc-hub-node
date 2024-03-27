import { Module } from '@nestjs/common';
import { OrderHistoryWorker } from './workers/order.history.worker';
import { MercadoLivreGetOrderWorker } from './workers/platforms/mercadolivre/get.order.worker';
import { OrderNotificationController } from './order-notification.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GetOrderWorkerFactory } from './factories/get.order.worker.factory';

@Module({
  imports: [
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
  controllers: [OrderNotificationController],
  providers: [
    MercadoLivreGetOrderWorker,
    OrderHistoryWorker,
    GetOrderWorkerFactory,
  ],
  exports: [MercadoLivreGetOrderWorker, OrderHistoryWorker],
})
export class OrderModule {}
