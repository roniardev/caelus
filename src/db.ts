// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Posts {
  id: string;
  content: string;
  excerpt: string;
  title: string;
  tempId: string;
  isNotSync: boolean;
  case: 'UPDATE' | 'CREATE' | 'DELETE';
}

const db = new Dexie('PostsDatabase') as Dexie & {
  posts: EntityTable<
    Posts,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  posts: 'id, content, excerpt, isNotSync, title, case', // primary key "id" (for the runtime!)
});

export type { Posts };
export { db };
