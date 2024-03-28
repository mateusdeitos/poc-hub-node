import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { CreateIntegrationUseCase } from './usecases/create.integration.usecase';
import { IntegrationRepository } from './integration.repository';
import { DrizzleDatabaseClient } from 'src/providers/database.client';

@Module({
  controllers: [IntegrationController],
  providers: [
    CreateIntegrationUseCase,
    IntegrationRepository,
    DrizzleDatabaseClient,
  ],
})
export class IntegrationModule {}
