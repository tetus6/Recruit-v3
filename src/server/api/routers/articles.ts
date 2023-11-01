import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const articlesType = z.object({
  creator: z.string(),
  name: z.string(),
  type: z.string(),
  content: z.string(),
});

export const articlesRouter = createTRPCRouter({
  fetch: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.articles.findMany();
  }),

  fetchById: publicProcedure.input(z.string()).query(({ctx, input}) => {
    return ctx.prisma.articles.findUnique({where: {id:input}});
  }),

  create: protectedProcedure
    .input(articlesType)
    .mutation(async ({ ctx, input }) => {
      const creatorId = ctx.session.user.id;
      const jobs = await ctx.prisma.jobs.create({
        data: {
          creator: creatorId,
          name: input.name,
          type: input.type,
          content: input.content,
        },
      });

      return jobs;
    }),
});
