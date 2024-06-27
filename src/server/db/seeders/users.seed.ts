/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import { Scrypt } from 'lucia';
import postgres from 'postgres';

import { env } from '@/env.mjs';
import * as schema from '@/server/db/schema';

export async function runUsersSeed() {
  const connection = postgres(env.DATABASE_URL);
  const db = drizzle(connection, { schema, logger: true });

  console.log('⏳ Running users seeder...');

  const start = Date.now();
  const data: (typeof schema.users.$inferInsert)[] = [];
  const hashedPassword = await new Scrypt().hash('satusatu');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1; i++) {
    data.push({
      id: 'm7xa8kd9xx40kn3qrtrgo',
      email: 'roon.ardiyanto@gmail.com',
      emailVerified: true,
      googleId: '103200627280079479126',
      hashedPassword,
    });
  }

  try {
    const end = Date.now();

    await db.insert(schema.users).values(data);
    console.log(`✅ Users Seeding completed in ${end - start}ms`);
  } catch (err) {
    const end = Date.now();
    console.error(`
        ❌ Posts Seeding failed in ${end - start}ms
        ${err}
        `);
  }
}
