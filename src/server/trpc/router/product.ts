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
});
