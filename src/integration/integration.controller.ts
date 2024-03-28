import { Body, Controller, Post } from '@nestjs/common';
import { CreateIntegrationDTO } from './create.integration.dto';
import { CreateIntegrationUseCase } from './usecases/create.integration.usecase';

@Controller('integration')
export class IntegrationController {
  constructor(
    private readonly createIntegrationUseCase: CreateIntegrationUseCase,
  ) {}
  @Post()
  public create(@Body() body: CreateIntegrationDTO) {
    return this.createIntegrationUseCase.execute({
      ...body,
      status: 'active',
    });
  }
}
