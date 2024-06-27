'use client';

import { Icon } from '@iconify/react';
import { Button, Group, Loader, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';

import { useCreatePost } from '@/client/mutation/posts/useCreatePost';
import { createPostSchema } from '@/server/api/routers/post/post.input';
import { useShowNotification } from '@/utils/hooks/useShowNotification';

const ModalCreatePost: React.FC = () => {
  const showNotification = useShowNotification();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');
  const { mutateAsync, isPending } = useCreatePost();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      excerpt: '',
      content: '',
    },
    validate: zodResolver(createPostSchema.omit({ userId: true })),
  });
  const handleSubmit = async (values: any) => {
    showNotification({
      title: 'Create Post',
      message: 'Processing...',
      type: 'loading',
    });
    try {
      await mutateAsync(values);
      showNotification({
        title: 'Create Post',
        message: 'Successfully created post',
        type: 'success',
      });
      close();
    } catch (error: any) {
      showNotification({
        title: 'Create Post',
        message: error.message,
        type: 'error',
      });
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
        radius="md"
      >
        {' '}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              disabled={isPending}
              required
              placeholder="title"
              autoComplete="title"
              name="title"
              type="title"
              radius="md"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <TextInput
              disabled={isPending}
              required
              placeholder="excerpt"
              autoComplete="excerpt"
              name="excerpt"
              type="excerpt"
              radius="md"
              key={form.key('excerpt')}
              {...form.getInputProps('excerpt')}
            />
            <TextInput
              disabled={isPending}
              required
              placeholder="content"
              autoComplete="content"
              name="content"
              type="content"
              radius="md"
              key={form.key('content')}
              {...form.getInputProps('content')}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button
              disabled={isPending}
              type="submit"
              radius="md"
              leftSection={isPending ? <Loader size="xs" /> : null}
              w="100%"
            >
              Create Post
            </Button>
          </Group>
        </form>
      </Modal>
      <Button
        leftSection={<Icon icon="tabler:plus" width={18} height={18} />}
        onClick={open}
      >
        Create Post
      </Button>
    </>
  );
};

export default ModalCreatePost;
