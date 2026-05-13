import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './table';

const connectionString = useRuntimeConfig().databaseUrl;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set.');
}

export const sql = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(sql, { schema, });
