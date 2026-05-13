import { integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const classes = pgTable('classes', {
  ...commonColumns(),
  code: varchar('code', { length: 100, }).notNull().unique(),
  name: varchar('name', { length: 255, }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100, }),
  characteristics: jsonb('characteristics').$type<string[]>().notNull().default([]),
  poseDirection: jsonb('pose_direction').$type<string[]>().notNull().default([]),
  combatWeight: text('combat_weight'),
  combatStyle: text('combat_style'),
  powerSource: text('power_source'),
  signatureIdentity: text('signature_identity'),
  renderingKeywords: jsonb('rendering_keywords').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
});
