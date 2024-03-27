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

@Controller('order-notification')
export class OrderNotificationController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject('GetOrderWorker')
    private readonly worker: TOrdersModule.GetOrderInterface<any, any>,
  ) {}

  @HttpCode(200)
  @Post(':platform')
  public async handle(
    @Body() notification: TOrdersModule.ParsedOrderNotification<any>,
    @Param('platform') platform: string,
  ) {
    const uniqueId = randomBytes(16).toString('hex');

    await this.amqpConnection.publish(
      'orders_receive_notification_exchange',
      `orders.notification.${platform}`,
      { uniqueId, step: 'order_notification_received', content: notification },
    );

    const order = await this.worker.getOrderFromNotification(notification);

    const result = await this.amqpConnection.publish(
      'orders_receive_notification_exchange',
      `orders.new.${platform}`,
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
