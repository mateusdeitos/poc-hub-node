import { integration } from 'drizzle/schema';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { CreateIntegrationDTO } from './create.integration.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationRepository {
  constructor(private client: DrizzleDatabaseClient) {}

  public async create(dto: CreateIntegrationDTO) {
    return this.client
      .getDb()
      .insert(integration)
      .values(dto)
      .returning()
      .execute();
  }
}
