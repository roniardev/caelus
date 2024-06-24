'use client';

import { Icon } from '@iconify/react';
import {
  ActionIcon,
  Alert,
  Divider,
  Group,
  Paper,
  PaperProps,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { useFormState } from 'react-dom';

import { login } from '@/lib/auth/actions';

import FormInput from './FormInput';

export function LoginForm(props: PaperProps) {
  const [state, formAction] = useFormState(login, null);
  return (
    <Paper radius="lg" p="xl" {...props}>
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
      <Text
        size="xl"
        fw={900}
        ta="center"
        style={{
          letterSpacing: '-0.05em',
        }}
      >
        Notex
      </Text>

      <Group grow mb="md" mt="md">
        <Link href="/login/google">
          <ActionIcon variant="subtle" size="xl">
            <Icon icon="devicon:google" height={34} width={34} />
          </ActionIcon>
        </Link>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form action={formAction}>
        <FormInput />
      </form>
    </Paper>
  );
}
