import { Module } from '@nestjs/common';
import { MercadoLivreModule } from 'src/providers/handlers/mercadolivre/mercadolivre.module';
import { IntegrationAuthRepository } from '../integration.auth/db/integration.auth.repository';
import { IntegrationRepository } from './db/integration.repository';
import { IntegrationController } from './http/integration.controller';
import { TestAuthFactory } from './factories/test.auth.factory';
import { CreateIntegrationUseCase } from './usecases/create.integration.usecase';
import { TestAuthIntegrationUseCase } from './usecases/test.auth.integration.usecase';
import { GetIntegrationUseCase } from './usecases/get.integration.usecase';

@Module({
  controllers: [IntegrationController],
  providers: [
    GetIntegrationUseCase,
    CreateIntegrationUseCase,
    TestAuthIntegrationUseCase,
    IntegrationRepository,
    IntegrationAuthRepository,

    TestAuthFactory,
  ],
  imports: [MercadoLivreModule],
})
export class IntegrationModule {}
