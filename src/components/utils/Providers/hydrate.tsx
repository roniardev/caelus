'use client';

import {
  HydrationBoundary as HydrationBound,
  HydrationBoundaryProps,
} from '@tanstack/react-query';

function HydrationBoundary(props: HydrationBoundaryProps) {
  return <HydrationBound {...props} />;
}

export default HydrationBoundary;
