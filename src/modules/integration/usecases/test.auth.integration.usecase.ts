import { Injectable } from '@nestjs/common';
import { CreateIntegrationAuthDTO } from 'src/modules/integration.auth/dto/create.integration.auth.dto';
import { PlatformRef } from '../enum/integrations';
import { TestAuthFactory } from '../test.auth.factory';

@Injectable()
export class TestAuthIntegrationUseCase {
  constructor(private readonly testAuthFactory: TestAuthFactory) {}

  async execute(
    platformRef: PlatformRef,
    authData: CreateIntegrationAuthDTO,
  ): Promise<void> {
    await this.testAuthFactory.getInstance(platformRef).run(authData);
  }
}
