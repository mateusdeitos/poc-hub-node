import { Injectable } from '@nestjs/common';
import { CreateIntegrationDTO } from '../create.integration.dto';
import { IntegrationRepository } from '../integration.repository';

@Injectable()
export class CreateIntegrationUseCase {
  constructor(private repository: IntegrationRepository) {}

  public async execute(dto: CreateIntegrationDTO) {
    // TODO:

    // Alterar dto para receber info de autenticação
    // Testar autenticação pela api da plataforma antes de salvar no banco
    // Salvar dados de autenticação

    return this.repository.create(dto);
  }
}
