'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { onlineManager, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import ReactQueryRewind from 'react-query-rewind';

import { db } from '@/db';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      retry: 0,
    },
  },
});
// 3. Set up the persister.

export default function RQProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  useEffect(() => {
    if (navigator.onLine) {
      onlineManager?.setOnline(true);
    } else {
      onlineManager?.setOnline(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.onLine]);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() =>
        queryClient.resumePausedMutations().then(async () => {
          const res: any = queryClient.getQueryData([
            'posts',
            1,
            10,
            'desc',
            'createdAt',
            undefined,
          ]);
          res
            .filter((item) => item.isSynced === false)
            .forEach(async (item) => {
              await db.posts.delete(item.id);
            });
          // console.log('res', res);
          queryClient.invalidateQueries();
          // console.log('resumePausedMutations', v);
        })
      }
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <ReactQueryRewind />
    </PersistQueryClientProvider>
  );
}
