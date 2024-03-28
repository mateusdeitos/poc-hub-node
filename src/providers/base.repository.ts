import { DrizzleDatabaseClient } from './database.client';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export abstract class Repository {
  protected db: NodePgDatabase;
  constructor(private client: DrizzleDatabaseClient) {
    this.db = client.getDb();
  }
}
