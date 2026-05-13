import { boolean, integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const docs = pgTable('docs', {
  ...commonColumns(),
  systemId: varchar('system_id', { length: 100, }).notNull().unique(),
  title: varchar('title', { length: 255, }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50, }).notNull(),
  entryPoint: boolean('entry_point').notNull().default(false),
  alwaysLoad: boolean('always_load').notNull().default(false),
  loadOrder: integer('load_order').notNull().default(0),
  dependencies: jsonb('dependencies').$type<string[]>().notNull().default([]),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  version: varchar('version', { length: 50, }),
  sourcePath: varchar('source_path', { length: 500, }),
});
