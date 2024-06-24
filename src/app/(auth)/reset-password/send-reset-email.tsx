'use client';

import { Button, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { sendPasswordResetLink } from '@/lib/auth/actions';
import { Paths } from '@/lib/constant';

export function SendResetEmail() {
  const [state, formAction] = useFormState(sendPasswordResetLink, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      notifications.show({
        title: 'Password reset email sent',
        message: 'Check your email for the password reset link.',
      });
      router.push(Paths.Login);
    }
    if (state?.error) {
      notifications.show({
        title: 'Error',
        message: state.error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.error, state?.success]);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Title order={2}>Reset Password</Title>
        <Text size="sm">
          Enter your email address to receive a password reset link.
        </Text>
        <TextInput
          label="Email"
          placeholder="Email"
          required
          type="email"
          name="email"
          id="email"
          {...state}
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Link href={Paths.Login}>
          <Button variant="link" size="sm" className="p-0">
            Already have an account? Log in
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-between">
        <Link href={Paths.Signup}>
          <Button variant="link" size="sm" className="p-0">
            Not signed up? Sign up now
          </Button>
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Send reset email
      </Button>
    </form>
  );
}
