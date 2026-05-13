import { integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const themes = pgTable('themes', {
  ...commonColumns(),
  code: varchar('code', { length: 100, }).notNull().unique(),
  name: varchar('name', { length: 255, }).notNull(),
  description: text('description'),
  tier: varchar('tier', { length: 100, }),
  coreIdentity: text('core_identity'),
  primaryColors: jsonb('primary_colors').$type<string[]>().notNull().default([]),
  accentColors: jsonb('accent_colors').$type<string[]>().notNull().default([]),
  fxElements: jsonb('fx_elements').$type<string[]>().notNull().default([]),
  lightingStyle: jsonb('lighting_style').$type<string[]>().notNull().default([]),
  materialLanguage: jsonb('material_language').$type<string[]>().notNull().default([]),
  shapeLanguage: jsonb('shape_language').$type<string[]>().notNull().default([]),
  atmosphere: jsonb('atmosphere').$type<string[]>().notNull().default([]),
  environmentalInfluence: jsonb('environmental_influence').$type<string[]>().notNull().default([]),
  renderingKeywords: jsonb('rendering_keywords').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
});
