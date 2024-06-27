import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

import { loginSchema } from '@/server/api/routers/auth/auth.input';
import { login } from '@/server/api/routers/auth/auth.service';

export const { POST } = route({
  login: routeOperation({
    method: 'POST',
  })
    .input({
      contentType: 'application/json',
      body: loginSchema,
    })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.object({
          status: z.number(),
          data: z.object({
            token: z.string(),
            expiresAt: z.date(),
          }),
        }),
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({
          status: z.number(),
          message: z.string(),
        }),
      },
    ])
    .handler(async (req) => {
      const { email, password } = await req.json();

      try {
        const response = await login({
          email,
          password,
        });

        return TypedNextResponse.json(response, {
          status: 200,
        });
      } catch (error) {
        return TypedNextResponse.json(
          {
            status: 401,
            message: 'Invalid email or password',
          },
          {
            status: 401,
          },
        );
      }
    }),
});
