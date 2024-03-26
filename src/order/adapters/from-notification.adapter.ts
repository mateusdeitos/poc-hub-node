import { Factory } from './factory';

export type RawNotification = {
  platform: string;
  content: any;
};

export type ParsedNotification = {
  platform: string;
  companyId: number;
  integrationId: number;
  orderIdentifiers: Array<{ key: string; value: any }>;
  content: any;
};

export interface FromNotificationAdapterInterface {
  parseNotification(notification: RawNotification): Promise<ParsedNotification>;
}

export class FromNotificationAdapter
  implements FromNotificationAdapterInterface
{
  async parseNotification(
    notification: RawNotification,
  ): Promise<ParsedNotification> {
    const adapter = new Factory().createAdapter(notification.platform);
    return adapter.parseNotification(notification);
  }
}
