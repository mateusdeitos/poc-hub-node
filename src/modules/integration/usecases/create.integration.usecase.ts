import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IntegrationAuthRepository } from 'src/modules/integration.auth/db/integration.auth.repository';
import { IntegrationRepository } from '../db/integration.repository';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';

@Injectable()
export class CreateIntegrationUseCase {
  constructor(
    @Inject('DB')
    private readonly db: NodePgDatabase,
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationAuthRepository: IntegrationAuthRepository,
  ) {}

  public async execute(companyId: string, dto: CreateIntegrationDTO) {
    const integration = await this.db.transaction(async (tx) => {
      this.integrationRepository.setTransaction(tx);
      this.integrationAuthRepository.setTransaction(tx);

      const integration = await this.integrationRepository.create(
        companyId,
        dto.integration,
      );

      await this.integrationAuthRepository.create(
        companyId,
        integration.id,
        dto.authData,
      );

      return integration;
    });

    return this.integrationRepository.get(companyId, integration.id);
  }
}
