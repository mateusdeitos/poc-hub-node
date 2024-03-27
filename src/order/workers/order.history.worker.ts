import {
  RabbitPayload,
  RabbitRequest,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';

export class OrderHistoryWorker {
  @RabbitSubscribe({
    exchange: 'orders_receive_notification_exchange',
    queue: 'queue_orders_history',
    routingKey: 'orders.#',
  })
  async process(
    @RabbitPayload() envelope: Record<string, any>,
    @RabbitRequest() amqpMsg,
  ) {
    console.log(
      'OrderHistoryWorker',
      JSON.stringify(
        {
          envelope,
          fields: amqpMsg.fields,
          properties: amqpMsg.properties,
        },
        null,
        2,
      ),
    );
  }
}
