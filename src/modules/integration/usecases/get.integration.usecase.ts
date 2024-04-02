import { Injectable } from '@nestjs/common';
import { IntegrationRepository } from '../db/integration.repository';

@Injectable()
export class GetIntegrationUseCase {
  constructor(private readonly integrationRepository: IntegrationRepository) {}

  public async execute(companyId: string, integrationId: string) {
    return this.integrationRepository.get(companyId, integrationId);
  }
}
