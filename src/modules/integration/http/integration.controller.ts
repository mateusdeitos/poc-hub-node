import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateIntegrationDTO } from '../dto/create.integration.dto';
import { CreateIntegrationUseCase } from '../usecases/create.integration.usecase';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import { newIntegrationValidation } from '../validations';

@Controller('integration')
export class IntegrationController {
  constructor(
    private readonly createIntegrationUseCase: CreateIntegrationUseCase,
  ) {}
  @Post()
  @UsePipes(new ZodValidationPipe(newIntegrationValidation))
  public create(@Body() body: CreateIntegrationDTO) {
    return this.createIntegrationUseCase.execute(body.companyId, body);
  }
}
