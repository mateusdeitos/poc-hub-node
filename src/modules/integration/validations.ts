import { createInsertSchema } from 'drizzle-zod';
import {
  integration,
  integrationAuth,
  integrationAuthType,
  integrationIntegrationAuth,
} from 'drizzle/schema';
import { z } from 'zod';
import { integrationsEnum } from './enum/integrations';

const integrationIntegrationAuthSchema = createInsertSchema(
  integrationIntegrationAuth,
);

// pedir pelo menos token, refreshToken, expiresIn
const integrationAuthSchema = createInsertSchema(integrationAuth);

export const platformRefValidation = z
  .number()
  .int()
  .refine((value) => !(value in integrationsEnum), 'Invalid platformRef');

export const authDataValidation = z.object({
  data: z.unknown(),
  type: z.enum(integrationAuthType.enumValues, {
    invalid_type_error: 'Invalid auth type',
  }),
  scope: integrationIntegrationAuthSchema.shape.scope.default('main'),
});

export const testAuthValidation = authDataValidation.pick({
  type: true,
  scope: true,
});

export const newIntegrationValidation = z.object({
  companyId: z.string().uuid(),
  integration: createInsertSchema(integration, {
    platformRef: platformRefValidation,
  }).omit({
    companyId: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    status: true,
  }),
  authData: authDataValidation,
});
