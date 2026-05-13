import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const commonColumns = () => ({
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  useYn: varchar('use_yn', { length: 1, }).notNull().default('Y'),
  deleteYn: varchar('delete_yn', { length: 1, }).notNull().default('N'),
  createId: integer('create_id'),
  createDate: timestamp('create_date', { withTimezone: true, }).notNull().defaultNow(),
  updateId: integer('update_id'),
  updateDate: timestamp('update_date', { withTimezone: true, }),
  deleteId: integer('delete_id'),
  deleteDate: timestamp('delete_date', { withTimezone: true, }),
});
