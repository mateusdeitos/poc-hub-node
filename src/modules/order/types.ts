export declare module TOrdersModule {
  type ParsedOrderNotification<NotificationContent = any> = {
    platform: string;
    companyId: number;
    integrationId: number;
    content: NotificationContent;
  };

  interface GetOrderInterface<NotificationContent, OrderPayload> {
    getOrderFromNotification(
      notification: ParsedOrderNotification<NotificationContent>,
    ): Promise<OrderPayload>;
  }
}
