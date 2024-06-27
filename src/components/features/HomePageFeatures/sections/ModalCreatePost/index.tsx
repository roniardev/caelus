'use client';

import { Icon } from '@iconify/react';
import { Button, Flex, Loader, Modal, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';

import { useCreatePost } from '@/client/mutation/posts/useCreatePost';
import { createPostSchema } from '@/server/api/routers/post/post.input';
import { useShowNotification } from '@/utils/hooks/useShowNotification';

type Props = {
  isDisabled?: boolean;
};

const ModalCreatePost: React.FC<Props> = (props) => {
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
      form.reset();
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
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
        radius="md"
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Flex direction="column" gap="md" p="sm">
          <Title order={3}>Create Post</Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="md">
              <TextInput
                disabled={isPending}
                label="Title"
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
                label="Excerpt"
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
                label="Content"
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

              <Button
                disabled={isPending}
                type="submit"
                radius="md"
                leftSection={isPending ? <Loader size="xs" /> : null}
                w="100%"
              >
                Create Post
              </Button>
              <Button
                disabled={isPending}
                variant="outline"
                onClick={close}
                radius="md"
                w="100%"
              >
                Close
              </Button>
            </Flex>
          </form>
        </Flex>
      </Modal>
      <Button
        leftSection={<Icon icon="tabler:plus" width={18} height={18} />}
        disabled={props.isDisabled}
        onClick={open}
        radius="md"
      >
        Create Post
      </Button>
    </>
  );
};

export default ModalCreatePost;
