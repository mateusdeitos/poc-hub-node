import { integrationAuth, integrationIntegrationAuth } from 'drizzle/schema';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import { Injectable } from '@nestjs/common';
import { CreateIntegrationAuthDTO } from '../dto/create.integration.auth.dto';

@Injectable()
export class IntegrationAuthRepository {
  constructor(private client: DrizzleDatabaseClient) {}

  public async create(
    companyId: string,
    integrationId: string,
    dto: CreateIntegrationAuthDTO,
  ) {
    const db = this.client.getDb();
    const [auth] = await db
      .insert(integrationAuth)
      .values({
        companyId,
        data: dto.data,
      })
      .returning()
      .execute();

    await db.insert(integrationIntegrationAuth).values({
      companyId,
      integrationId,
      integrationAuthId: auth.id,
      type: dto.type,
      scope: dto.scope,
    });

    return auth;
  }
}
