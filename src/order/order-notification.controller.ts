import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { FromNotificationAdapter } from './adapters/from-notification.adapter';
import { randomBytes } from 'crypto';

@Controller('order-notification')
export class OrderNotificationController {
  constructor(private readonly adapter: FromNotificationAdapter) {}

  @HttpCode(200)
  @Post(':platform')
  public async handle(@Body() content, @Param('platform') platform: string) {
    const message = await this.adapter.parseNotification({
      platform,
      content,
    });

    const uniqueId = randomBytes(16).toString('hex');

    return {
      uniqueId,
      message,
    };
  }
}
