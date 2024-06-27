import { z } from 'zod';

export const postSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      excerpt: z.string(),
      status: z.enum(['published', 'draft']),
      createdAt: z.date(),
      user: z.object({
        email: z.string(),
      }),
    }),
  ),
  meta: z.object({
    page: z.number(),
    size: z.number(),
    total: z.number(),
  }),
});

export type Post = z.infer<typeof postSchema>;

export const createPostSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  userId: z.string(),
});

export const createPostResponseSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  id: z.string(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;

export const updatePostSchema = createPostSchema
  .omit({ userId: true })
  .extend({
    id: z.string(),
  })
  .partial();

export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const deletePostSchema = z.object({
  id: z.string(),
});
