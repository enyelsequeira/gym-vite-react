import {createClient} from '@libsql/client';
import {drizzle} from 'drizzle-orm/libsql';
import * as schema from './schema.ts';
import env from "../../server/src/env";

export const client = () =>
  createClient({
      url: env.DATABASE_URL,
      authToken: env.DATABASE_AUTH_TOKEN,
  });

export const db = drizzle(client(), { schema });
