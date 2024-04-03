import { authDataValidation } from '../../integration/validations';

export type CreateIntegrationAuthDTO = Zod.infer<typeof authDataValidation>;
