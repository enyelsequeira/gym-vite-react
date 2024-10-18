import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';

export const usersTable = sqliteTable('users_table', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  age: integer('age', { mode: 'number' }).notNull(),
  email: text('email').notNull().unique(),
});

export const selectUsersSchema = createSelectSchema(usersTable);
