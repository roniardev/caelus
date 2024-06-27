/* eslint-disable consistent-return */
// src/app/api/v2/todos/route.ts

import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

import { uncachedValidateRequest } from '@/lib/auth/validate-request';

import {
  deletePostSchema,
  updatePostSchema,
} from '@/server/api/routers/post/post.input';
import {
  checkPostExist,
  deletePost,
  updatePost,
} from '@/server/api/routers/post/post.service';

// export const runtime = 'edge'; // Edge runtime is supported.

export const { PATCH, DELETE } = route({
  updatePost: routeOperation({
    method: 'PATCH',
  })
    .input({
      contentType: 'application/json',
      body: updatePostSchema,
      params: z.object({
        postId: z.string(),
      }),
    })
    .outputs([
      {
        status: 201,
        contentType: 'application/json',
        body: updatePostSchema,
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
      {
        status: 400,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
    ])
    .middleware(async (_, { params }) => {
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
      const exist = await checkPostExist(params.postId);
      if (!exist) {
        return TypedNextResponse.json(
          {
            message: 'Post not found',
          },
          {
            status: 400,
          },
        );
      }
    })
    .handler(async (req, { params }) => {
      const { title, excerpt, content } = await req.json();
      const post = await updatePost({
        title,
        excerpt,
        content,
        id: params.postId,
      });
      return TypedNextResponse.json(post, {
        status: 201,
      });
    }),
  deletePost: routeOperation({
    method: 'DELETE',
  })
    .input({
      contentType: 'application/json',
      params: z.object({
        postId: z.string(),
      }),
    })
    .outputs([
      {
        status: 201,
        contentType: 'application/json',
        body: deletePostSchema,
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
      {
        status: 400,
        contentType: 'application/json',
        body: z.object({
          message: z.string(),
        }),
      },
    ])
    .middleware(async (_, { params }) => {
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
      const exist = await checkPostExist(params.postId);
      if (!exist) {
        return TypedNextResponse.json(
          {
            message: 'Post not found',
          },
          {
            status: 400,
          },
        );
      }
    })
    .handler(async (req, { params }) => {
      const post = await deletePost({
        id: params.postId,
      });
      return TypedNextResponse.json(post, {
        status: 201,
      });
    }),
});
