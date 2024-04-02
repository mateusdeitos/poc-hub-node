import { Module } from '@nestjs/common';
import { MercadoLivreRestClient } from 'src/providers/platform.modules/mercadolivre/rest.client';
import { MercadoLivreTestAuth } from 'src/providers/platform.modules/mercadolivre/test.auth';
import { UserApi } from 'src/providers/platform.modules/mercadolivre/user.api';

@Module({
  providers: [MercadoLivreTestAuth, UserApi, MercadoLivreRestClient],
})
export class MercadoLivreModule {}
