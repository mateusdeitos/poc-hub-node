import { integration } from 'drizzle/schema';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationRepository {
  constructor(private client: DrizzleDatabaseClient) {}

  public async create(
    companyId: string,
    dto: CreateIntegrationDTO['integration'],
  ) {
    const [record] = await this.client
      .getDb()
      .insert(integration)
      .values({
        companyId,
        data: dto.data,
        name: dto.name,
        platformRef: dto.platformRef,
        status: 'active',
      })
      .returning()
      .execute();

    return record;
  }
}
