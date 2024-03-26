import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ParsedNotification } from 'src/order/adapters/from-notification.adapter';

export class MercadoLivreGetOrderWorker {
  @RabbitRPC({
    exchange: 'orders_receive_notification_exchange',
    queue: 'queue_orders_mercadolivre',
    routingKey: 'orders.new.mercadolivre',
  })
  async process(@RabbitPayload() message: ParsedNotification) {
    console.log('MercadoLivreGetOrderWorker', JSON.stringify(message, null, 2));
  }
}
