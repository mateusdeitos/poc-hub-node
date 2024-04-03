import { Module } from '@nestjs/common';
import { integrationsEnum } from 'src/modules/integration/enum/integrations';
import { TestAuthFactory } from 'src/modules/integration/factories/test.auth.factory';
import { MercadoLivreRestClient } from 'src/providers/handlers/mercadolivre/rest.client';
import { MercadoLivreTestAuth } from 'src/providers/handlers/mercadolivre/test.auth';
import { UserApi } from 'src/providers/handlers/mercadolivre/user.api';
import { AuthApi } from './auth.api';
import { MercadoLivreAuthRestClient } from './auth.rest.client';

@Module({
  providers: [
    MercadoLivreTestAuth,
    UserApi,
    AuthApi,
    MercadoLivreRestClient,
    MercadoLivreAuthRestClient,

    TestAuthFactory.registerHandler(
      integrationsEnum.MERCADOLIVRE,
      MercadoLivreTestAuth,
    ),
  ],
})
export class MercadoLivreModule {}
