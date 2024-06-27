/* eslint-disable no-console */
import { runPostsSeed } from './posts.seed';
import { runUsersSeed } from './users.seed';

Promise.allSettled([runUsersSeed(), runPostsSeed()])
  .then(() => {
    console.log('✅ Seeding completed');
    return process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeding failed');
    console.error(err);
    return process.exit(1);
  });
