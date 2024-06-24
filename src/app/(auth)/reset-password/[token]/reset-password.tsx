'use client';

import { Button, PasswordInput, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { resetPassword } from '@/lib/auth/actions';

export function ResetPassword({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      notifications.show({
        title: 'Error',
        message: state.error,
      });
    }
  }, [state?.error]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Title order={2}>Reset Password</Title>
        <Text size="sm">Enter your new password.</Text>
        <PasswordInput
          label="Password"
          placeholder="Password"
          required
          name="password"
          id="password"
          {...state}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          id="confirmPassword"
          {...state}
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Button type="submit" className="w-full">
          Reset password
        </Button>
      </div>
    </form>
  );
}
