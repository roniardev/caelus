'use client';

import { Icon } from '@iconify/react';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Flex,
  Modal,
  Text,
} from '@mantine/core';
import { useDisclosure, useNetwork } from '@mantine/hooks';
import { onlineManager } from '@tanstack/query-core';
import { useIsMutating } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

import { queryClient } from '@/components/utils/Providers';

import { useCreatePost } from '@/client/mutation/posts/useCreatePost';
import { useDeletePost } from '@/client/mutation/posts/useDeletePost';
import { useReadAllPost } from '@/client/query/posts/useReadAllPost';
import { db } from '@/db';
import { useShowNotification } from '@/utils/hooks/useShowNotification';

import ModalCreatePost from '../ModalCreatePost';

const PAGE_SIZES = [10, 15, 20];

export function ListPosts() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [
    openedDeleteModal,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [idDelete, setIdDelete] = React.useState('');
  const networkStatus = useNetwork();
  const isMutating = useIsMutating();
  const showNotification = useShowNotification();
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync, isPending } = useDeletePost();
  const [pageSize, setPageSize] = React.useState(10);
  const { data, isLoading } = useReadAllPost({
    page,
    size: pageSize,
    sort: 'desc',
    orderBy: 'createdAt',
    status: undefined,
  });

  const handleDeletePost = async (id: string) => {
    showNotification({
      title: 'Delete Post',
      message: 'Processing...',
      type: 'loading',
    });
    try {
      await mutateAsync({ id });
      showNotification({
        title: 'Delete Post',
        message: 'Successfully deleted post',
        type: 'success',
      });
    } catch (error: any) {
      showNotification({
        title: 'Delete Post',
        message: error.message,
        type: 'error',
      });
    } finally {
      closeDeleteModal();
      setIdDelete('');
    }
  };

  const handleSyncOffline = async () => {
    const res = await db.posts.toArray();
    res
      .filter((item) => item.isNotSync === true && item.case === 'CREATE')
      .forEach((item) => {
        const postsCache: any = queryClient.getQueryData([
          'posts',
          1,
          10,
          'desc',
          'createdAt',
          undefined,
        ]);

        if (postsCache?.data?.some((v) => v.id !== item.id)) {
          queryClient.setQueryData(
            ['posts', 1, 10, 'desc', 'createdAt', undefined],
            (oldData: any) => {
              const posts = {
                data: [
                  {
                    ...item,
                  },
                  ...oldData.data,
                ],
                meta: oldData.meta,
              };
              return posts;
            },
          );
        }
      });
  };

  const handleSyncOnline = async () => {
    if (isMutating === 0) {
      const res = await db.posts.toArray();
      res
        .filter((item) => item.isNotSync === true && item.case === 'CREATE')
        .forEach(async (item) => {
          await db.posts.delete(item.id);
          await db.posts.where('id').equals(item.id).delete();
          await createPost({
            content: item.content,
            title: item.title,
            excerpt: item.excerpt,
            id: item.id,
          });
        });
    }
  };

  useEffect(() => {
    if (onlineManager?.isOnline()) {
      handleSyncOnline();
    } else {
      handleSyncOffline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineManager?.isOnline]);

  return (
    <>
      <Text>
        Network:{' '}
        {networkStatus.online ? (
          <Badge color="green">Online</Badge>
        ) : (
          <Badge color="red">Offline</Badge>
        )}
      </Text>
      <Flex direction="row" w="100%" justify="end">
        <ModalCreatePost isDisabled={isLoading} />
      </Flex>
      <DataTable
        records={data?.data || []}
        withTableBorder
        borderRadius="md"
        withColumnBorders
        striped
        highlightOnHover
        page={page}
        onPageChange={(v) => setPage(v)}
        recordsPerPage={pageSize}
        totalRecords={data?.meta.total || 0}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        height={600}
        loaderType="dots"
        loaderSize="sm"
        loaderColor="green"
        loaderBackgroundBlur={4}
        columns={[
          {
            accessor: 'no',
            title: 'No',
            width: 50,
            render: (value, idx) => (page - 1) * pageSize + idx + 1,
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
          },
          {
            accessor: 'title',
            title: 'Title',
            sortable: true,
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
            width: 200,
          },
          {
            accessor: 'excerpt',
            title: 'Excerpt',
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
            width: 300,
          },
          {
            accessor: 'case',
            title: 'Data State',
            render: (value: any) => {
              const state: any[] = [];
              if (value?.case === 'CREATE') {
                state.push(
                  <Badge size="xs" variant="outline" color="green">
                    Created
                  </Badge>,
                );
              }
              if (value?.case === 'UPDATE') {
                state.push(
                  <Badge size="xs" variant="outline" color="blue">
                    Updated
                  </Badge>,
                );
              }
              if (value?.case === 'DELETE') {
                state.push(
                  <Badge size="xs" variant="outline" color="red">
                    Deleted
                  </Badge>,
                );
              }
              if (value?.isNotSync === true) {
                state.push(
                  <Badge size="xs" color="yellow">
                    Not Synced
                  </Badge>,
                );
              } else {
                state.push(
                  <Badge size="xs" color="green">
                    Synced
                  </Badge>,
                );
              }
              return state.map((item, index) => (
                <Flex direction="row" gap="xs" key={index}>
                  {item}
                </Flex>
              ));
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (value) =>
              value.status === 'published' ? (
                <Badge color="green">Published</Badge>
              ) : (
                <Badge color="red">Draft</Badge>
              ),
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
            width: 100,
          },
          {
            accessor: 'createdAt',
            title: 'Created At',
            sortable: true,
            render: (value) => dayjs(value.createdAt).format('DD/MM/YYYY'),
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
            width: 150,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            render: (value) => (
              <ActionIcon
                onClick={() => {
                  setIdDelete(value.id);
                  openDeleteModal();
                }}
                color="red.6"
              >
                <Icon icon="tabler:trash" width={18} height={18} />
              </ActionIcon>
            ),
            titleStyle: {
              backgroundColor: '#f0f0f0',
            },
            width: 50,
          },
        ]}
        emptyState="No posts found"
        fetching={isLoading}
      />
      <Modal
        opened={openedDeleteModal}
        onClose={closeDeleteModal}
        transitionProps={{ transition: 'fade', duration: 200 }}
        radius="md"
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Flex direction="column" gap="md" p="sm">
          <Alert
            color="red"
            title="Are you sure you want to delete this post?"
            variant="light"
          >
            This action cannot be undone.
          </Alert>
          <Button
            onClick={() => {
              setIdDelete('');
              closeDeleteModal();
            }}
            radius="md"
            size="sm"
            disabled={isPending}
            variant="outline"
          >
            Back
          </Button>
          <Button
            color="red"
            size="sm"
            radius="md"
            onClick={() => handleDeletePost(idDelete)}
            disabled={isPending}
          >
            Delete
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
