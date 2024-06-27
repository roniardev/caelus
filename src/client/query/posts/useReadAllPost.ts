import { useQuery } from '@tanstack/react-query';

import { Post } from '@/server/api/routers/post/post.input';
import api from '@/services/api';

type PostsInput = {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
  orderBy?: 'createdAt' | 'title';
  status?: 'published' | 'draft';
};

async function readAllPost(input: PostsInput) {
  const response = await api.get(
    `/api/v1/posts?page=${input.page}&size=${input.size}&sort=${input.sort}&orderBy=${input.orderBy}&status=${input.status}`,
  );
  return response;
}

export const useReadAllPost = (input: PostsInput) =>
  useQuery<Post>({
    queryKey: ['posts', ...Object.values(input)],
    queryFn: () => readAllPost(input),
  });
