import { Module } from '@nestjs/common';
import { IntegrationController } from './http/integration.controller';
import { CreateIntegrationUseCase } from './usecases/create.integration.usecase';
import { IntegrationRepository } from './db/integration.repository';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { IntegrationAuthRepository } from '../integration.auth/db/integration.auth.repository';

@Module({
  controllers: [IntegrationController],
  providers: [
    CreateIntegrationUseCase,
    IntegrationRepository,
    IntegrationAuthRepository,
    DrizzleDatabaseClient,
  ],
})
export class IntegrationModule {}
