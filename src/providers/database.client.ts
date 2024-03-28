import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import drizzleConfig from 'drizzle.config';

export class DrizzleDatabaseClient implements OnModuleInit, OnModuleDestroy {
  private client: Client;
  private db: NodePgDatabase;

  async onModuleInit() {
    const credentials = drizzleConfig.dbCredentials;

    this.client = new Client(credentials);

    await this.client.connect();
    this.db = drizzle(this.client);
  }

  getDb() {
    return this.db;
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
