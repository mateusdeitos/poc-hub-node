import { BadRequestException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PlatformRef, integrationsEnum } from './enum/integrations';
import { MercadoLivreTestAuth } from 'src/providers/platform.handlers/mercadolivre/test.auth';
import { TestAuthInterface } from 'src/providers/interfaces/test.auth.interface';

@Injectable()
export class TestAuthFactory {
  constructor(private readonly moduleRef: ModuleRef) {}

  getInstance(platformRef: PlatformRef): TestAuthInterface {
    const map = {
      [integrationsEnum.MERCADOLIVRE]: MercadoLivreTestAuth,
    };

    const classRef = map[platformRef];
    if (!classRef) {
      throw new BadRequestException('Invalid platform');
    }

    const instance = this.moduleRef.get(map[platformRef], { strict: false });
    return instance;
  }
}
