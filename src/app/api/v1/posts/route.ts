/* eslint-disable consistent-return */
// src/app/api/v2/todos/route.ts

import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

import { uncachedValidateRequest } from '@/lib/auth/validate-request';

import {
  createPostResponseSchema,
  createPostSchema,
  postSchema,
} from '@/server/api/routers/post/post.input';
import { createPost, listPosts } from '@/server/api/routers/post/post.service';

// export const runtime = 'edge'; // Edge runtime is supported.

export const { GET, POST } = route({
  getTodos: routeOperation({
    method: 'GET',
  })
    .input({
      querySchema: z.object({
        page: z.string().optional(),
        size: z.string().optional(),
      }),
      query: z.object({
        page: z.string().optional(),
        size: z.string().optional(),
      }),
    })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: postSchema,
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
    ])
    .middleware(async () => {
      const { session, user } = await uncachedValidateRequest();
      if (!session || !user) {
        return TypedNextResponse.json(
          {
            message: 'Unauthorized',
          },
          {
            status: 401,
          },
        );
      }
    })
    .handler(async (req) => {
      const page = Number(req.nextUrl.searchParams.get('page')) || 1;
      const size = Number(req.nextUrl.searchParams.get('size')) || 4;
      const posts = await listPosts({
        page,
        size,
      });
      return TypedNextResponse.json(posts, {
        status: 200,
      });
    }),

  createTodo: routeOperation({
    method: 'POST',
  })
    .input({
      contentType: 'application/json',
      body: createPostSchema.omit({ userId: true }),
    })
    .outputs([
      {
        status: 201,
        contentType: 'application/json',
        body: createPostResponseSchema,
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
    ])
    // Optional middleware logic executed before request validation.
    .middleware(async () => {
      const { session, user } = await uncachedValidateRequest();
      if (!session || !user) {
        return TypedNextResponse.json(
          {
            message: 'Unauthorized',
          },
          {
            status: 401,
          },
        );
      }
    })
    .handler(async (req) => {
      const { title, excerpt, content } = await req.json();
      const { user } = await uncachedValidateRequest();
      const post = await createPost({
        title,
        excerpt,
        content,
        userId: user?.id || '',
      });
      return TypedNextResponse.json(post, {
        status: 201,
      });
    }),
});
