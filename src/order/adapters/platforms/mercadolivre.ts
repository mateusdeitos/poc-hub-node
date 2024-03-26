import {
  FromNotificationAdapterInterface,
  RawNotification,
  ParsedNotification,
} from '../from-notification.adapter';

export class MercadoLivreFromNotificationAdapter
  implements FromNotificationAdapterInterface
{
  async parseNotification(
    notification: RawNotification,
  ): Promise<ParsedNotification> {
    return {
      platform: notification.platform,
      companyId: 1,
      integrationId: 1,
      content: notification.content,
      orderIdentifiers: [
        {
          key: 'orderId',
          value: notification.content.orderId,
        },
      ],
    };
  }
}
