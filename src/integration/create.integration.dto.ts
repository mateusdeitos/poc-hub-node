import { integration } from 'drizzle/schema';
import { TUtils } from 'src/utils/types';

export type CreateIntegrationDTO = TUtils.ParseCreateDTO<
  typeof integration.$inferInsert
>;
