import { Module } from '@nestjs/common';
import { MercadoLivreRestClient } from 'src/providers/platform.modules/mercadolivre/rest.client';
import { MercadoLivreTestAuth } from 'src/providers/platform.modules/mercadolivre/test.auth';
import { UserApi } from 'src/providers/platform.modules/mercadolivre/user.api';
import { AuthApi } from './auth.api';
import { MercadoLivreAuthRestClient } from './auth.rest.client';

@Module({
  providers: [
    MercadoLivreTestAuth,
    UserApi,
    AuthApi,
    MercadoLivreRestClient,
    MercadoLivreAuthRestClient,
  ],
})
export class MercadoLivreModule {}
