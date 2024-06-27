'use client';

import { Icon } from '@iconify/react';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { loginSchema } from '@/lib/validators/auth';

import { useLogin } from '@/client/mutation/auth/useLogin';
import { useShowNotification } from '@/utils/hooks/useShowNotification';

export function LoginForm(props: PaperProps) {
  const showNotification = useShowNotification();
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });
  const handleSubmit = async (values: any) => {
    showNotification({
      title: 'Login',
      message: 'Processing...',
      type: 'loading',
    });
    try {
      const response = await mutateAsync(values);
      if (response.error) {
        throw new Error(response.error);
      }
      showNotification({
        title: 'Login',
        message: 'Successfully logged in',
        type: 'success',
      });
      router.push('/');
    } catch (error: any) {
      showNotification({
        title: 'Login',
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Paper radius="lg" p="xl" {...props}>
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

      <Flex direction="row" align="center" justify="center" my="sm">
        <Link href="/login/google">
          <ActionIcon variant="subtle" size="xl">
            <Icon icon="devicon:google" height={34} width={34} />
          </ActionIcon>
        </Link>
      </Flex>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            disabled={isPending}
            required
            placeholder="email@example.com"
            autoComplete="email"
            name="email"
            type="email"
            radius="md"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            disabled={isPending}
            required
            placeholder="********"
            autoComplete="current-password"
            name="password"
            type="password"
            radius="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button
            type="submit"
            radius="md"
            disabled={isPending}
            leftSection={isPending ? <Loader size="xs" /> : null}
            w="100%"
          >
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
