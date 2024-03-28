import {
  pgEnum,
  pgTable,
  uuid,
  smallint,
  varchar,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const integrationStatus = pgEnum('status', [
  'active',
  'inactive',
  'disconnected',
]);

const id = uuid('id')
  .primaryKey()
  .notNull()
  .default(sql`gen_random_uuid()`);

const createdAt = timestamp('createdAt')
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();

const updatedAt = timestamp('updatedAt', { mode: 'string' })
  .default(sql`CURRENT_TIMESTAMP`)
  .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
  .notNull();

export const company = pgTable('company', {
  id,
  name: varchar('name', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const integration = pgTable('integration', {
  id,
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
    id,
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
  id,
  data: json('data').notNull(),
  createdAt,
  updatedAt,
});
