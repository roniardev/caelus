'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TRPCReactProvider } from '../../../trpc/react';

function ReactQueryProviders({ children }: React.PropsWithChildren) {
  return (
    <TRPCReactProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TRPCReactProvider>
  );
}

export default ReactQueryProviders;
