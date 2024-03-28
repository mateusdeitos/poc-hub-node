import drizzleConfig from '../../drizzle.config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { company } from 'drizzle/schema';

const main = async () => {
  console.log(drizzleConfig.dbCredentials);
  const client = new Client(drizzleConfig.dbCredentials);
  const db = drizzle(client);
  const data: (typeof company.$inferInsert)[] = [];

  data.push({
    name: 'Company 1',
    id: '3cbcbdbe-b1e2-4f20-9662-6ce4c5c4a3d1',
  });

  try {
    console.log('Seed start');
    await db.insert(company).values(data);
    console.log('Seed done');
  } catch (error) {
    console.error('Seed failed', error);
  }
};

main();
