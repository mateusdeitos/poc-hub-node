import { Module } from '@nestjs/common';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { MercadoLivreRestClient } from 'src/providers/platform.handlers/mercadolivre/rest.client';
import { MercadoLivreTestAuth } from 'src/providers/platform.handlers/mercadolivre/test.auth';
import { UserApi } from 'src/providers/platform.handlers/mercadolivre/user.api';
import { IntegrationAuthRepository } from '../integration.auth/db/integration.auth.repository';
import { IntegrationRepository } from './db/integration.repository';
import { IntegrationController } from './http/integration.controller';
import { TestAuthFactory } from './test.auth.factory';
import { CreateIntegrationUseCase } from './usecases/create.integration.usecase';
import { TestAuthIntegrationUseCase } from './usecases/test.auth.integration.usecase';

@Module({
  controllers: [IntegrationController],
  providers: [
    CreateIntegrationUseCase,
    TestAuthFactory,
    TestAuthIntegrationUseCase,
    IntegrationRepository,
    IntegrationAuthRepository,
    DrizzleDatabaseClient,
    MercadoLivreTestAuth,
    UserApi,
    MercadoLivreRestClient,
  ],
})
export class IntegrationModule {}
