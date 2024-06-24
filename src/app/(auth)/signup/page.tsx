import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '@/lib/constant';

import PageLayout from '@/components/layouts/PageLayout';

import { Signup } from './signup';

export const metadata = {
  title: 'Sign Up',
  description: 'Signup Page',
};

export default async function SignupPage() {
  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

  return (
    <PageLayout>
      <Signup />
    </PageLayout>
  );
}
