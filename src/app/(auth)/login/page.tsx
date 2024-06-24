import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '@/lib/constant';

import LoginPageFeatures from '@/components/features/LoginPageFeatures';
import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: 'Login',
  description: 'Login Page',
};

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

  return (
    <PageLayout>
      <LoginPageFeatures />
    </PageLayout>
  );
}
