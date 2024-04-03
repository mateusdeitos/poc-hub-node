import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import {
  integration,
  integrationAuth,
  integrationIntegrationAuth,
  integrationStatus,
} from 'drizzle/schema';
import { Repository } from 'src/providers/base.repository';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';

@Injectable()
export class IntegrationRepository extends Repository {
  public async create(
    companyId: string,
    dto: CreateIntegrationDTO['integration'],
    status: (typeof integrationStatus.enumValues)[number] = 'active',
  ) {
    const [record] = await this.context()
      .insert(integration)
      .values({
        companyId,
        data: dto.data,
        name: dto.name,
        platformRef: dto.platformRef,
        status,
      })
      .returning()
      .execute();

    return record;
  }

  public async get(companyId: string, integrationId: string) {
    const result = await this.db
      .select({
        integration,
        auth: {
          id: integrationAuth.id,
          data: integrationAuth.data,
          type: integrationIntegrationAuth.type,
          scope: integrationIntegrationAuth.scope,
        },
      })
      .from(integration)
      .where(
        and(
          eq(integration.companyId, companyId),
          eq(integration.id, integrationId),
        ),
      )
      .leftJoin(
        integrationIntegrationAuth,
        eq(integration.id, integrationIntegrationAuth.integrationId),
      )
      .leftJoin(
        integrationAuth,
        eq(integrationIntegrationAuth.integrationAuthId, integrationAuth.id),
      )
      .execute();

    if (!result.length) {
      return null;
    }

    return {
      integration: result[0].integration,
      auth: result.map((r) => r.auth),
    };
  }
}
