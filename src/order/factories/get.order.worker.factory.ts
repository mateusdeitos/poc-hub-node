import { BadRequestException, FactoryProvider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { integrationsEnum } from 'src/integration/enum/integrations';
import { MercadoLivreGetOrderWorker } from '../workers/platforms/mercadolivre/get.order.worker';

export const GetOrderWorkerFactory: FactoryProvider = {
  provide: 'GetOrderWorker',
  useFactory: (request: Request) => {
    switch (Number(request.params.platformRef)) {
      case integrationsEnum.MERCADOLIVRE:
        return new MercadoLivreGetOrderWorker();

      default:
        throw new BadRequestException('Platform not found');
    }
  },
  inject: [REQUEST],
};
