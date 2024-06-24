import { Card, Text, Title } from '@mantine/core';
import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '@/lib/constant';

import { SendResetEmail } from './send-reset-email';

export const metadata = {
  title: 'Forgot Password',
  description: 'Forgot Password Page',
};

export default async function ForgotPasswordPage() {
  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

  return (
    <Card className="w-full max-w-md">
      <Title>Forgot password?</Title>
      <Text>Password reset link will be sent to your email.</Text>

      <SendResetEmail />
    </Card>
  );
}
