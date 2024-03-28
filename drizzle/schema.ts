import {
  pgEnum,
  pgTable,
  uuid,
  smallint,
  varchar,
  timestamp,
  json,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const integrationStatus = pgEnum('status', [
  'active',
  'inactive',
  'disconnected',
]);

export const integrationAuthType = pgEnum('type', [
  'oauth',
  'token-based',
  'basic',
]);

const id = uuid('id')
  .primaryKey()
  .notNull()
  .default(sql`gen_random_uuid()`);

const companyId = uuid('company_id')
  .notNull()
  .references(() => company.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });

const integrationId = uuid('integration_id')
  .notNull()
  .references(() => integration.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });

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

export const integration = pgTable(
  'integration',
  {
    id,
    companyId,
    status: integrationStatus('status').notNull(),
    platformRef: smallint('platformRef').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    data: json('data').notNull(), // aqui seriam parâmetros?
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      companyIdIdx: index('integration_company_id_idx').on(table.companyId),
    };
  },
);

export const integrationIntegrationAuth = pgTable(
  'integration_integration_auth',
  {
    id,
    companyId,
    integrationId,
    integrationAuthId: uuid('integration_auth_id')
      .notNull()
      .references(() => integrationAuth.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    type: integrationAuthType('type').notNull(),
    scope: varchar('scope', { length: 30 }).notNull().default('main'),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      integrationTypeScopeUniqueIdx: uniqueIndex(
        'integration_type_scope_unique_idx',
      ).on(table.integrationId, table.type, table.scope),
      companyIdIntegrationIdAuthIdIndex: index(
        'company_id_integration_id_auth_id_index',
      ).on(table.companyId, table.integrationId, table.integrationAuthId),
    };
  },
);

export const integrationAuth = pgTable(
  'integration_auth',
  {
    id,
    companyId,
    data: json('data').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      companyIdIdx: index('integration_auth_company_id_idx').on(
        table.companyId,
      ),
    };
  },
);
