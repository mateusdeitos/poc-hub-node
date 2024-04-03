import {
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { PlatformRef } from '../../integration/enum/integrations';
import { GetIntegrationUseCase } from '../../integration/usecases/get.integration.usecase';
import { TestAuthIntegrationUseCase } from '../../integration/usecases/test.auth.integration.usecase';
import {
  authDataValidation,
  testAuthValidation,
} from '../../integration/validations';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';

@Controller('integration/auth')
export class TestAuthIntegrationController {
  constructor(
    private readonly getIntegrationUseCase: GetIntegrationUseCase,
    private readonly testAuthIntegrationUseCase: TestAuthIntegrationUseCase,
  ) {}

  @Post('test/:companyId/:integrationId')
  @UsePipes(new ZodValidationPipe(testAuthValidation))
  async testAuth(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('integrationId', ParseUUIDPipe) integrationId: string,
    @Body() authData: Zod.infer<typeof testAuthValidation>,
  ) {
    const existingIntegration = await this.getIntegrationUseCase.execute(
      companyId,
      integrationId,
    );

    if (!existingIntegration) {
      throw new NotFoundException('Integration not found');
    }

    const {
      integration: { platformRef },
    } = existingIntegration;

    const _auth = existingIntegration.auth.find(
      (auth) => auth.scope === authData.scope && auth.type === authData.type,
    );

    const auth = authDataValidation.safeParse(_auth);
    if (!auth.success) {
      throw new NotFoundException('Auth not found');
    }

    await this.testAuthIntegrationUseCase.execute(
      platformRef as PlatformRef,
      auth.data,
    );

    return { response: 'ok' };
  }
}
