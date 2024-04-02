import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import drizzleConfig from 'drizzle.config';

export class DrizzleDatabaseClient implements OnModuleInit, OnModuleDestroy {
  private client: Client;
  private db: NodePgDatabase;

  async onModuleInit() {
    if (this.db) {
      return;
    }

    await this.connect();
  }

  private async connect() {
    const credentials = drizzleConfig.dbCredentials;

    this.client = new Client(credentials);
    await this.client.connect();
    this.db = drizzle(this.client);
    return this.db;
  }

  async getDb() {
    return this.db ?? this.connect();
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
