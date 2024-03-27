import {
  pgEnum,
  pgTable,
  uuid,
  smallint,
  varchar,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';

export const integrationStatus = pgEnum('status', [
  'active',
  'inactive',
  'disconnected',
]);

const createdAt = timestamp('createdAt', { mode: 'string' })
  .defaultNow()
  .notNull();

const updatedAt = timestamp('updatedAt', { mode: 'string' });

export const company = pgTable('company', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const integration = pgTable('integration', {
  id: uuid('id').primaryKey().notNull(),
  companyId: uuid('company_id')
    .notNull()
    .references(() => company.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  status: integrationStatus('status').notNull(),
  platformRef: smallint('platformRef').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  data: json('data').notNull(), // aqui seriam parâmetros?
  createdAt,
  updatedAt,
});

export const integrationIntegrationAuth = pgTable(
  'integration_integration_auth',
  {
    id: uuid('id').primaryKey().notNull(),
    integrationId: uuid('integration_id')
      .notNull()
      .references(() => integration.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    integrationAuthId: uuid('integration_auth_id')
      .notNull()
      .references(() => integrationAuth.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    data: json('data').notNull(),
    createdAt,
    updatedAt,
  },
);

export const integrationAuth = pgTable('integration_auth', {
  id: uuid('id').primaryKey().notNull(),
  data: json('data').notNull(),
  createdAt,
  updatedAt,
});
