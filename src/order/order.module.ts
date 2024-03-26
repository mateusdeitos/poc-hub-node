import { Module } from '@nestjs/common';
import { FromNotificationAdapter } from './adapters/from-notification.adapter';

@Module({
  providers: [FromNotificationAdapter],
  exports: [FromNotificationAdapter],
})
export class OrderModule {}
