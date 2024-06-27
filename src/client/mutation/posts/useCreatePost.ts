import { useMutation } from '@tanstack/react-query';

import { CreatePostInput } from '@/server/api/routers/post/post.input';
import api from '@/services/api';

import { queryClient } from '../../../components/utils/Providers/index';

async function createPost(request: CreatePostInput) {
  const response = await api.post('/api/v1/posts', request, {});
  return response;
}

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
    mutationKey: ['createPost'],
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
