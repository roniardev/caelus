'use client';

import { Icon } from '@iconify/react';
import { ActionIcon, Alert, Badge, Button, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { parseAsInteger, useQueryState } from 'nuqs';
import React from 'react';

import { useDeletePost } from '@/client/mutation/posts/useDeletePost';
import { useReadAllPost } from '@/client/query/posts/useReadAllPost';
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

  const showNotification = useShowNotification();
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

  return (
    <>
      <Flex direction="row" w="100%" justify="end">
        <ModalCreatePost isDisabled={data?.meta.total === 0} />
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
