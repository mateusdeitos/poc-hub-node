import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';
import { CreateIntegrationUseCase } from '../usecases/create.integration.usecase';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { newIntegrationValidation } from '../validations';
import { TestAuthIntegrationUseCase } from '../usecases/test.auth.integration.usecase';
import { PlatformRef } from '../enum/integrations';

@Controller('integration/:platformRef')
export class IntegrationController {
  constructor(
    private readonly createIntegrationUseCase: CreateIntegrationUseCase,
    private readonly testAuthIntegrationUseCase: TestAuthIntegrationUseCase,
  ) {}
  @Post()
  @UsePipes(new ZodValidationPipe(newIntegrationValidation))
  async create(
    @Param('platformRef', ParseIntPipe) platformRef: PlatformRef,
    @Body() body: CreateIntegrationDTO,
  ) {
    await this.testAuthIntegrationUseCase.execute(platformRef, body.authData);

    return this.createIntegrationUseCase.execute(body.companyId, body);
  }
}
