import { Injectable } from '@nestjs/common';
import { TOrdersModule } from 'src/order/types';

type NotificationContent = {
  orderId: string;
  sellerId: string;
};

type OrderPayload = {
  orderId: string;
  date: string;
  total: number;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  items: [
    {
      sku: string;
      price: number;
      quantity: number;
    },
  ];
};

@Injectable()
export class MercadoLivreGetOrderWorker
  implements TOrdersModule.GetOrderInterface<NotificationContent, OrderPayload>
{
  async getOrderFromNotification(
    notification: TOrdersModule.ParsedOrderNotification<NotificationContent>,
  ): Promise<OrderPayload> {
    return {
      orderId: notification.content.orderId,
      date: '2021-01-01',
      total: 100,
      client: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        phone: '123456789',
      },
      items: [{ sku: '123', price: 50, quantity: 2 }],
    };
  }
}
