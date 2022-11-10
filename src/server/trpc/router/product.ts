import { z } from "zod";

import { router, publicProcedure } from "../trpc";

// Each procedure represents an API endpoint
export const productRouter = router({
  /// GET
  getByID: publicProcedure
    .input(
      z.object(
        {
          id: z.string()
        }
      )
    )
    .query(({ input }) => {
      // return ctx.prisma.product.findUnique({where: {id:input}});
      // Can be accessed from .data in response
      return {
        queryID: input.id,
        response: {
          example: 'true'
        }
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),

  // POST
  add: publicProcedure
  .input(
    z.object(
      {
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        inventory: z.number().min(0),
        price: z.number().min(1),
      }
    )
  )
  // .mutation( async ({ctx, input}) => {
  //   const product = await ctx.prisma.product.create({
  //     data: input
  //   });
  //   return product;
  // }),
  .mutation( async ({input}) => {
    return {
      postBody: input
    }
  }),
  
});
