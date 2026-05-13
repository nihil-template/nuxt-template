import { integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const presets = pgTable('presets', {
  ...commonColumns(),
  code: varchar('code', { length: 100, }).notNull().unique(),
  name: varchar('name', { length: 255, }).notNull(),
  description: text('description'),
  coreIdentity: text('core_identity'),
  recommendedRank: varchar('recommended_rank', { length: 50, }),
  recommendedThemes: jsonb('recommended_themes').$type<string[]>().notNull().default([]),
  recommendedRaceTypes: jsonb('recommended_race_types').$type<string[]>().notNull().default([]),
  recommendedClassArchetypes: jsonb('recommended_class_archetypes').$type<string[]>().notNull().default([]),
  recommendedWeapons: jsonb('recommended_weapons').$type<string[]>().notNull().default([]),
  recommendedOutfitStyle: jsonb('recommended_outfit_style').$type<string[]>().notNull().default([]),
  recommendedFx: jsonb('recommended_fx').$type<string[]>().notNull().default([]),
  recommendedLighting: jsonb('recommended_lighting').$type<string[]>().notNull().default([]),
  recommendedBackgrounds: jsonb('recommended_backgrounds').$type<string[]>().notNull().default([]),
  recommendedMood: jsonb('recommended_mood').$type<string[]>().notNull().default([]),
  shapeLanguage: jsonb('shape_language').$type<string[]>().notNull().default([]),
  renderingKeywords: jsonb('rendering_keywords').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
});
