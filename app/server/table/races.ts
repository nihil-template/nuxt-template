import { integer, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { commonColumns } from './common';

export const races = pgTable('races', {
  ...commonColumns(),
  code: varchar('code', { length: 100, }).notNull().unique(),
  name: varchar('name', { length: 255, }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100, }),
  anatomyType: text('anatomy_type'),
  bodyBuild: text('body_build'),
  surfaceTraits: text('surface_traits'),
  faceStructure: text('face_structure'),
  silhouette: text('silhouette'),
  materialTraits: text('material_traits'),
  renderingKeywords: jsonb('rendering_keywords').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
});
