import { Module } from '@nestjs/common';
import { TestAuthIntegrationController } from './http/test.auth.integration.controller';
import { IntegrationModule } from '../integration/integration.module';
import { GetIntegrationUseCase } from '../integration/usecases/get.integration.usecase';
import { TestAuthIntegrationUseCase } from '../integration/usecases/test.auth.integration.usecase';
import { IntegrationRepository } from '../integration/db/integration.repository';
import { TestAuthFactory } from '../integration/factories/test.auth.factory';
import { IntegrationAuthRepository } from './db/integration.auth.repository';

@Module({
  controllers: [TestAuthIntegrationController],
  providers: [
    GetIntegrationUseCase,
    TestAuthIntegrationUseCase,
    IntegrationRepository,
    IntegrationAuthRepository,

    TestAuthFactory,
  ],
  imports: [IntegrationModule],
})
export class IntegrationAuthModule {}
