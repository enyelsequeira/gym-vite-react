//
// export default defineConfig({
//   out: './src/db/migrations',
//   schema: './src/db/schema.ts',
//   dialect: 'sqlite',
//   driver: 'turso',
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//     authToken: process.env.DATABASE_AUTH_TOKEN,
//   },
//   strict: true,
//   verbose: true,
// }) satisfies Config;
// import * as dotenv from 'dotenv';
// import { defineConfig } from 'drizzle-kit';
//
// dotenv.config();
// export default defineConfig({
//   out: './src/db/migrations',
//   schema: './src/db/schema.ts',
//   dialect: 'sqlite',
//   driver: 'turso',
//   dbCredentials: {
//     url: process.env.VITE_TURSO_URL as string,
//     authToken: process.env.VITE_TURSO_AUTH_TOKEN as string,
//   },
// });
import 'dotenv/config';

export default {
  out: './drizzle/db/migrations',
  schema: './drizzle/db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env.VITE_TURSO_DB_URL,
    authToken: process.env.VITE_TURSO_DB_AUTH_TOKEN,
  },
};
