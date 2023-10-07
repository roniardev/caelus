import pathManager from 'path-kanri';

const { getPath, getFullPath } = pathManager(
  {
    example: '/example/{exampleId}/{slug}',
    users: '/users',
    userProfile: '/users/{userId}',
    userPosts: '/users/{userId}/posts',
    userPost: '/users/{userId}/posts/{postId}',
  },
  'https://example.com',
);

export { getFullPath, getPath };
