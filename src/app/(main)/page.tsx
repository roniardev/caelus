'use client';

import HomePageFeatures from '@/components/features/HomePageFeatures';
import PageLayout from '@/components/layouts/PageLayout';

import { FcmTokenComp } from '@/services/firebase-foreground';

export default function HomePage() {
  return (
    <PageLayout>
      <FcmTokenComp />
      <HomePageFeatures />
    </PageLayout>
  );
}
