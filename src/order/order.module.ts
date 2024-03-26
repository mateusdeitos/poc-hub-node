import { Module } from '@nestjs/common';
import { FromNotificationAdapter } from './adapters/from-notification.adapter';
import { MercadoLivreGetOrderWorker } from './workers/platforms/mercadolivre';
import { OrderHistoryWorker } from './workers/order.history.worker';

@Module({
  providers: [
    FromNotificationAdapter,
    MercadoLivreGetOrderWorker,
    OrderHistoryWorker,
  ],
  exports: [
    FromNotificationAdapter,
    MercadoLivreGetOrderWorker,
    OrderHistoryWorker,
  ],
})
export class OrderModule {}
