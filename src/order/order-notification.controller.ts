import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { FromNotificationAdapter } from './adapters/from-notification.adapter';

@Controller('order-notification')
export class OrderNotificationController {
  constructor(
    private readonly adapter: FromNotificationAdapter,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @HttpCode(200)
  @Post(':platform')
  public async handle(@Body() content, @Param('platform') platform: string) {
    const message = await this.adapter.parseNotification({
      platform,
      content,
    });

    const uniqueId = randomBytes(16).toString('hex');

    const envelope = {
      uniqueId,
      message,
    };

    const result = await this.amqpConnection.publish(
      'orders_receive_notification_exchange',
      `orders.new.${platform}`,
      envelope,
    );

    return {
      result,
    };
  }
}
