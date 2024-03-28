import { newIntegrationValidation } from '../../integration/validations';

export type CreateIntegrationAuthDTO = Zod.infer<
  typeof newIntegrationValidation
>['authData'];
