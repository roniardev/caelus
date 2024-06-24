'use client';

import {
  Alert,
  Button,
  Card,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { useFormState } from 'react-dom';

import { signup } from '@/lib/auth/actions';

export function Signup() {
  const [state, formAction] = useFormState(signup, null);

  return (
    <Card className="w-full max-w-md">
      <Title order={1}>Sign Up</Title>
      <Text>Sign up to start using the app</Text>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <TextInput
            required
            placeholder="email@example.com"
            autoComplete="email"
            name="email"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <PasswordInput
            name="password"
            required
            autoComplete="current-password"
            placeholder="********"
          />
        </div>

        {state?.fieldError ? (
          <Alert color="red" mt="md" mb="md">
            {Object.values(state.fieldError).map((err) => (
              <li className="ml-4" key={err}>
                {err}
              </li>
            ))}
          </Alert>
        ) : state?.formError ? (
          <Alert color="red" mt="md" mb="md">
            {state?.formError}
          </Alert>
        ) : null}
        <div>
          <Link href="/login">
            <span className="p-0 text-xs font-medium hover:underline underline-offset-4">
              Already signed up? Login instead.
            </span>
          </Link>
        </div>

        <Button type="submit" color="green">
          Sign Up
        </Button>
      </form>
    </Card>
  );
}
