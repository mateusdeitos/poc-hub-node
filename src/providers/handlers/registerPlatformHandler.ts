import { Provider } from '@nestjs/common';
import { PlatformRef } from 'src/modules/integration/enum/integrations';

export const registerPlatformHandler = (
  prefix: string,
  platformRef: PlatformRef,
  handler: any,
): Provider => {
  return {
    provide: `${prefix}_${platformRef}`,
    useClass: handler,
  };
};
