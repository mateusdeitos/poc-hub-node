import { newIntegrationValidation } from '../validations';

export type CreateIntegrationDTO = Zod.infer<typeof newIntegrationValidation>;
