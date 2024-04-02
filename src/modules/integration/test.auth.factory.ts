import { BadRequestException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PlatformRef, integrationsEnum } from './enum/integrations';
import { MercadoLivreTestAuth } from 'src/providers/platform.handlers/mercadolivre/test.auth';
import { TestAuthInterface } from 'src/providers/interfaces/test.auth.interface';

@Injectable()
export class TestAuthFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  getInstance(platformRef: PlatformRef): TestAuthInterface {
    switch (platformRef) {
      case integrationsEnum.MERCADOLIVRE:
        return this.moduleRef.get(MercadoLivreTestAuth, { strict: false });

      default:
        throw new BadRequestException('Invalid platform');
    }
  }
}
