import { and, eq, sql } from 'drizzle-orm';
import { generateId } from 'lucia';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { uncachedValidateRequest } from '@/lib/auth/validate-request';

import { db } from '@/server/db';
import { posts } from '@/server/db/schema';

import {
  CreatePostResponse,
  createPostSchema,
  deletePostSchema,
  postSchema,
  updatePostSchema,
} from './post.input';

type Post = z.infer<typeof postSchema>;
type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;
type DeletePost = z.infer<typeof deletePostSchema>;

type PostsInput = {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
  orderBy?: 'createdAt' | 'title';
  status?: 'published' | 'draft' | null;
};

export const listPosts = async ({
  page,
  size,
  sort = 'desc',
  orderBy = 'createdAt',
  status = null,
}: PostsInput): Promise<Post> => {
  const { user } = await uncachedValidateRequest();
  const countTotalPosts = db
    .select({ count: sql<number>`count(*)` })
    .from(posts);

  const totalPostsFilteredStatus = await (status === null
    ? countTotalPosts.where(eq(posts.userId, user?.id || '')) // No where clause if status is null (count all)
    : countTotalPosts.where(
        and(eq(posts.userId, user?.id || ''), eq(posts.status, status)),
      ));

  const postsList = await db.query.posts.findMany({
    where: (table, { eq: eqFn }) =>
      status
        ? and(eqFn(table.status, status), eqFn(table.userId, user?.id || ''))
        : eqFn(table.userId, user?.id || ''),
    offset: (page - 1) * size,
    limit: size,
    orderBy: (table, { desc, asc }) =>
      match(orderBy)
        .with('createdAt', () =>
          sort === 'desc' ? desc(table.createdAt) : asc(table.createdAt),
        )
        .with('title', () =>
          sort === 'desc' ? desc(table.title) : asc(table.title),
        )
        .otherwise(() => desc(table.createdAt)),
    columns: {
      id: true,
      title: true,
      excerpt: true,
      status: true,
      createdAt: true,
    },
    with: { user: { columns: { email: true } } },
  });

  const meta = {
    page,
    size,
    total: Number(totalPostsFilteredStatus[0].count),
  };

  return postSchema.parse({
    data: postsList,
    meta,
  });
};

export const createPost = async (
  input: CreatePost,
): Promise<CreatePostResponse> => {
  const id = generateId(15);
  await db.insert(posts).values({
    id,
    userId: input.userId,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
  });
  return {
    id,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
  };
};

export const updatePost = async (input: UpdatePost): Promise<UpdatePost> => {
  const [item] = await db
    .update(posts)
    .set({
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
    })
    .where(eq(posts.id, input.id || ''))
    .returning();

  return item;
};

export const checkPostExist = async (id: string): Promise<boolean> => {
  const item = await db.query.posts.findFirst({
    where: (table, { eq: eqFn }) => eqFn(table.id, id),
  });
  return !!item;
};

export const deletePost = async (input: DeletePost): Promise<DeletePost> => {
  const [item] = await db
    .delete(posts)
    .where(eq(posts.id, input.id))
    .returning();
  return item;
};
