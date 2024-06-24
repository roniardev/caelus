import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '@/lib/constant';

import HomePageFeatures from '@/components/features/HomePageFeatures';
import PageLayout from '@/components/layouts/PageLayout';

export default async function HomePage() {
  const { user } = await validateRequest();
  if (!user) redirect(Paths.Login);

  return (
    <PageLayout>
      <HomePageFeatures />
    </PageLayout>
  );
}
