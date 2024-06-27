import { useMutation } from '@tanstack/react-query';

import api from '@/services/api';

type loginRequest = {
  email: string;
  password: string;
};

async function login(request: loginRequest) {
  const response = await api.post('/api/v1/auth/login', request, {});
  return response;
}

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
