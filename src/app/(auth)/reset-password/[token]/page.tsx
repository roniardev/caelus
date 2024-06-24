import { Card, Text, Title } from '@mantine/core';

import { ResetPassword } from './reset-password';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset Password Page',
};

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <Card className="w-full max-w-md">
      <Title>Reset password</Title>
      <Text>Enter new password.</Text>

      <ResetPassword token={params.token} />
    </Card>
  );
}
