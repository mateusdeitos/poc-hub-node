import { Module } from '@nestjs/common';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { MercadoLivreModule } from 'src/providers/platform.handlers/mercadolivre/mercadolivre.module';
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
    TestAuthIntegrationUseCase,

    IntegrationRepository,
    IntegrationAuthRepository,
    DrizzleDatabaseClient,

    TestAuthFactory,
  ],
  imports: [MercadoLivreModule],
})
export class IntegrationModule {}
