import { useMutation } from '@tanstack/react-query';

import api from '@/services/api';

import { queryClient } from '../../../components/utils/Providers/index';

type DeletePostInput = {
  id: string;
};

async function deletePost(request: DeletePostInput) {
  const response = await api.remove(`/api/v1/posts/${request.id}`);
  return response;
}

export const useDeletePost = () =>
  useMutation({
    mutationFn: deletePost,
    mutationKey: ['deletePost'],
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
