'use client';

import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import {
  logout,
  resendVerificationEmail as resendEmail,
  verifyEmail,
} from '@/lib/auth/actions';

export const VerifyCode = () => {
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
  const [resendState, resendAction] = useFormState(resendEmail, null);
  const codeFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resendState?.success) {
      notifications.show({
        title: 'Verification code resent',
        message: 'Check your email for the verification code.',
      });
    }
    if (resendState?.error) {
      notifications.show({
        title: 'Error',
        message: resendState.error,
      });
    }
  }, [resendState?.error, resendState?.success]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      notifications.show({
        title: 'Error',
        message: verifyEmailState.error,
      });
    }
  }, [verifyEmailState?.error]);

  return (
    <div className="flex flex-col gap-2">
      <form ref={codeFormRef} action={verifyEmailAction}>
        <TextInput
          label="Verification code"
          placeholder="Verification code"
          required
          type="text"
          name="code"
          id="code"
          {...verifyEmailState}
        />

        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
      <form action={resendAction}>
        <Button type="submit" variant="outline" className="w-full">
          Resend verification code
        </Button>
      </form>
      <form action={logout}>
        <Button type="submit" variant="outline" className="w-full">
          Logout
        </Button>
      </form>
    </div>
  );
};
