import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import drizzleConfig from '../drizzle.config';

const client = new Client(drizzleConfig.dbCredentials);
const db = drizzle(client);

(async () => {
  await migrate(db, { migrationsFolder: './drizzle' });
})();
