import { Module } from '@nestjs/common';
import { MercadoLivreRestClient } from 'src/providers/platform.handlers/mercadolivre/rest.client';
import { MercadoLivreTestAuth } from 'src/providers/platform.handlers/mercadolivre/test.auth';
import { UserApi } from 'src/providers/platform.handlers/mercadolivre/user.api';

@Module({
  providers: [MercadoLivreTestAuth, UserApi, MercadoLivreRestClient],
})
export class MercadoLivreModule {}
