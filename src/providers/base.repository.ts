import { PgTransaction } from 'drizzle-orm/pg-core';
import { DrizzleDatabaseClient } from './database.client';
import {
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export abstract class Repository {
  protected transaction: PgTransaction<
    NodePgQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >;
  constructor(
    protected client: DrizzleDatabaseClient,
    @Inject('DB')
    protected db: NodePgDatabase,
  ) {}

  public setTransaction(
    transaction: PgTransaction<
      NodePgQueryResultHKT,
      Record<string, never>,
      ExtractTablesWithRelations<Record<string, never>>
    >,
  ) {
    this.transaction = transaction;
  }

  context() {
    return this.transaction ?? this.db;
  }
}
