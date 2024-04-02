import { Injectable } from '@nestjs/common';
import { integrationAuth, integrationIntegrationAuth } from 'drizzle/schema';
import { Repository } from 'src/providers/base.repository';
import { CreateIntegrationAuthDTO } from '../dto/create.integration.auth.dto';

@Injectable()
export class IntegrationAuthRepository extends Repository {
  public async create(
    companyId: string,
    integrationId: string,
    dto: CreateIntegrationAuthDTO,
  ) {
    const [auth] = await this.context()
      .insert(integrationAuth)
      .values({
        companyId,
        data: dto.data,
      })
      .returning();

    await this.context().insert(integrationIntegrationAuth).values({
      companyId,
      integrationId,
      integrationAuthId: auth.id,
      type: dto.type,
      scope: dto.scope,
    });

    return auth;
  }
}
