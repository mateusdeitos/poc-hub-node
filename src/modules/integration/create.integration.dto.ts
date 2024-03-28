import { integration, integrationAuth } from 'drizzle/schema';
import { TUtils } from 'src/utils/types';

export type CreateIntegrationDTO = {
  integration: TUtils.ParseCreateDTO<typeof integration.$inferInsert>;
  authData: TUtils.ParseCreateDTO<typeof integrationAuth.$inferInsert>;
};
