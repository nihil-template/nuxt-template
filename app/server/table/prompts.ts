import { jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const prompts = pgTable('prompts', {
  ...commonColumns(),
  name: varchar('name', { length: 255, }).notNull(),
  content: text('content').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  docIds: jsonb('doc_ids').$type<number[]>().notNull().default([]),
});
