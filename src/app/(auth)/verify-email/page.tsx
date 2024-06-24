import { Card, Text, Title } from '@mantine/core';
import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '@/lib/constant';

import { VerifyCode } from './verify-code';

export const metadata = {
  title: 'Verify Email',
  description: 'Verify Email Page',
};

export default async function VerifyEmailPage() {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);
  if (user.emailVerified) redirect(Paths.Dashboard);

  return (
    <Card className="w-full max-w-md">
      <Title order={2}>Verify Email</Title>
      <Text>
        Verification code was sent to <strong>{user.email}</strong>. Check your
        spam folder if you can't find the email.
      </Text>
      <VerifyCode />
    </Card>
  );
}
