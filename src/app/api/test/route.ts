import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

export const { GET } = route({
  getTest: routeOperation({
    method: 'GET',
  })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.object({
          status: z.number(),
          data: z.object({
            message: z.string(),
          }),
        }),
      },
    ])
    .handler(() =>
      TypedNextResponse.json({
        status: 200,
        data: {
          message: 'Hello World',
        },
      }),
    ),
});
