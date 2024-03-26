import {
  Nack,
  RabbitPayload,
  RabbitRequest,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { ParsedNotification } from 'src/order/adapters/from-notification.adapter';

export class OrderHistoryWorker {
  @RabbitSubscribe({
    exchange: 'orders_receive_notification_exchange',
    queue: 'queue_orders_history',
    routingKey: 'orders.*',
  })
  async process(
    @RabbitPayload() message: ParsedNotification,
    @RabbitRequest() amqpMsg,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(
      'OrderHistoryWorker',
      JSON.stringify(
        {
          message,
          fields: amqpMsg.fields,
          properties: amqpMsg.properties,
        },
        null,
        2,
      ),
    );
  }
}
