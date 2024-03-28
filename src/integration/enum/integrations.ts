export type PlatformRef =
  (typeof integrationsEnum)[keyof typeof integrationsEnum];

export const integrationsEnum = {
  MERCADOLIVRE: 8,
} as const;
