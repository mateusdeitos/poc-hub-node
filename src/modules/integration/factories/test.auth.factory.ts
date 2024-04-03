import { Injectable, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TestAuthInterface } from 'src/providers/interfaces/test.auth.interface';
import { PlatformRef } from '../enum/integrations';
import { registerPlatformHandler } from 'src/providers/handlers/registerPlatformHandler';

@Injectable()
export class TestAuthFactory {
  private static readonly REGISTER_PREFIX = 'TestAuthHandler';

  constructor(private readonly moduleRef: ModuleRef) {}

  static registerHandler(platformRef: PlatformRef, handler: any): Provider {
    return registerPlatformHandler(
      TestAuthFactory.REGISTER_PREFIX,
      platformRef,
      handler,
    );
  }

  getInstance(platformRef: PlatformRef): TestAuthInterface {
    return this.moduleRef.get<TestAuthInterface>(
      `${TestAuthFactory.REGISTER_PREFIX}_${platformRef}`,
      {
        strict: false,
      },
    );
  }
}
