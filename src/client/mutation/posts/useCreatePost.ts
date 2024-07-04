import { useMutation } from '@tanstack/react-query';
import { generateId } from 'lucia';

import { db } from '@/db';
import { CreatePostInput } from '@/server/api/routers/post/post.input';
import api from '@/services/api';

import { queryClient } from '../../../components/utils/Providers/index';

async function createPost(
  request: Omit<CreatePostInput, 'userId'> & { id?: string },
) {
  const response = await api.post(
    'http://localhost:5173/api/v1/posts',
    {
      content: request.content,
      title: request.title,
      excerpt: request.excerpt,
    },
    {},
  );
  return response;
}

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onMutate: async (newData) => {
      if (!navigator.onLine) {
        const tempId = generateId(15);
        await db.posts.add({
          ...newData,
          isNotSync: true,
          tempId,
          id: tempId,
          case: 'CREATE',
        });

        queryClient.setQueryData(
          ['posts', 1, 10, 'desc', 'createdAt', undefined],
          (oldData: any) => {
            const posts = {
              data: [
                {
                  ...newData,
                  id: tempId,
                  isNotSync: true,
                  case: 'CREATE',
                },
                ...oldData.data,
              ],
              meta: oldData.meta,
            };
            return posts;
          },
        );
        return { tempId };
      }
      return { tempId: null };
    },
    onError: (error, newData, context: any) => {
      queryClient.setQueryData(['posts'], context?.previousData);
    },
    onSuccess: async (data, newData, context: any) => {
      await db.posts.delete(context?.id);
      await db.posts.delete(newData?.id || '');
      await db.posts.delete(data?.id || '');
    },
  });
