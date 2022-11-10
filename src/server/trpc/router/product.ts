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
    .query(({ ctx, input }) => {
      // Can be accessed from .data in response
      return ctx.prisma.product.findUnique({where: {id:input.id}});
    }),

  getBySlug: publicProcedure
    .input(
      z.object(
        {
          slug: z.string()
        }
      )
    )
    .query(({ ctx, input }) => {
      // Can be accessed from .data in response
      return ctx.prisma.product.findUnique({where: {slug:input.slug}});
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
  .mutation( async ({ctx, input}) => {
    const product = await ctx.prisma.product.create({
      data: input
    });
    return product;
  }),

  // PUT
  edit: publicProcedure
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
  .mutation( async ({ctx, input}) => {
    const product = await ctx.prisma.product.update({
      where: {
        id: input.id
      },
      data: input
    });
    return product;
  }),

  // DELETE
  remove: publicProcedure
  .input(
    z.object(
      {
        id: z.string(),
      }
    )
  )
  .mutation( async ({ctx, input}) => {
    const product = await ctx.prisma.product.delete({
      where: {
        id: input.id
      },
    });
    return product;
  }),

  removeAll: publicProcedure
  .mutation( async ({ctx}) => {
    const product = await ctx.prisma.product.deleteMany({});
    return product;
  }),
  
});
