import { NotFoundException } from '@nestjs/common';
import { MercadoLivreFromNotificationAdapter } from './platforms/mercadolivre';
import { FromNotificationAdapterInterface } from './from-notification.adapter';

export class Factory {
  private readonly adapters = {
    mercadolivre: MercadoLivreFromNotificationAdapter,
  };

  createAdapter(platform: string): FromNotificationAdapterInterface {
    const adapter = this.adapters[platform];
    if (!adapter) {
      throw new NotFoundException(`Adapter for platform ${platform} not found`);
    }

    return new adapter();
  }
}
