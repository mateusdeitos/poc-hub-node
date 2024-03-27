export type Integration =
  (typeof integrationsEnum)[keyof typeof integrationsEnum];

export const integrationsEnum = {
  MERCADOLIVRE: 8,
} as const;
