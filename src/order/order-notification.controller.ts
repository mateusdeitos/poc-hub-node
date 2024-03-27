import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { TOrdersModule } from './types';
import { GetOrderWorkerFactory } from './factories/get.order.worker.factory';
import { Integration } from 'src/integration/enum/integrations';

@Controller('order-notification')
export class OrderNotificationController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(GetOrderWorkerFactory.provide)
    private readonly worker: TOrdersModule.GetOrderInterface<any, any>,
  ) {}

  @HttpCode(200)
  @Post(':platformRef')
  public async handle(
    @Body() notification: TOrdersModule.ParsedOrderNotification<any>,
    @Param('platformRef') platformRef: Integration,
  ) {
    const uniqueId = randomBytes(16).toString('hex');

    await this.amqpConnection.publish(
      'orders_receive_notification_exchange',
      `orders.notification.${platformRef}`,
      { uniqueId, step: 'order_notification_received', content: notification },
    );

    const order = await this.worker.getOrderFromNotification(notification);

    const result = await this.amqpConnection.publish(
      'orders_receive_notification_exchange',
      `orders.new.${platformRef}`,
      { uniqueId, step: 'order_obtained_from_platform', content: order },
      {
        headers: {
          'x-delay': 10000, // precisa de plugin de delay no RabbitMQ
        },
      },
    );

    if (!result) {
      throw new UnprocessableEntityException(
        'Order could not be sent to processing queue',
      );
    }

    return {
      uniqueId,
      message: 'Order obtained from platform and sent to processing queue',
      order,
    };
  }
}
