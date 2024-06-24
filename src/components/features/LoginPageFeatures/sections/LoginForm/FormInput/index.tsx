import {
  Button,
  Group,
  Loader,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useFormStatus } from 'react-dom';

export default function FormInput() {
  const { pending } = useFormStatus();

  return (
    <>
      <Stack>
        <TextInput
          required
          placeholder="email@example.com"
          autoComplete="email"
          name="email"
          type="email"
          radius="md"
        />
        <PasswordInput
          required
          placeholder="********"
          autoComplete="current-password"
          name="password"
          type="password"
          radius="md"
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Button
          type="submit"
          radius="md"
          disabled={pending}
          leftSection={pending ? <Loader size="xs" /> : null}
          w="100%"
        >
          Login
        </Button>
      </Group>
    </>
  );
}
