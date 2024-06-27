'use client';

import { Badge } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import { useReadAllPost } from '@/client/query/posts/useReadAllPost';

const PAGE_SIZES = [10, 15, 20];

export function ListPosts() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, isLoading } = useReadAllPost({
    page,
    size: pageSize,
    sort: 'desc',
    orderBy: 'createdAt',
    status: undefined,
  });

  return (
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
      height={500}
      columns={[
        {
          accessor: 'id',
          title: 'ID',
        },
        {
          accessor: 'title',
          title: 'Title',
        },
        {
          accessor: 'excerpt',
          title: 'Excerpt',
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
        },
        {
          accessor: 'createdAt',
          title: 'Created At',
        },
      ]}
      emptyState="No posts found"
      fetching={isLoading}
    />
  );
}
