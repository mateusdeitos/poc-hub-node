import { Injectable } from '@nestjs/common';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';
import { DrizzleDatabaseClient } from 'src/providers/database.client';
import {
  integration,
  integrationAuth,
  integrationIntegrationAuth,
} from 'drizzle/schema';

@Injectable()
export class CreateIntegrationUseCase {
  constructor(private readonly dbClient: DrizzleDatabaseClient) {}

  public async execute(companyId: string, dto: CreateIntegrationDTO) {
    // TODO:

    // Testar autenticação pela api da plataforma antes de salvar no banco

    const { id } = await this.dbClient.getDb().transaction(async (tx) => {
      const [result] = await tx
        .insert(integration)
        .values({
          companyId,
          data: dto.integration.data,
          name: dto.integration.name,
          platformRef: dto.integration.platformRef,
          status: 'active',
        })
        .returning();

      const [auth] = await tx
        .insert(integrationAuth)
        .values({
          companyId,
          data: dto.authData.data,
        })
        .returning();

      await tx.insert(integrationIntegrationAuth).values({
        companyId,
        integrationId: result.id,
        integrationAuthId: auth.id,
        type: dto.authData.type,
        scope: dto.authData.scope,
      });

      return result;
    });

    return { id };
  }
}
