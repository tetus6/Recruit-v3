import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const jobsType = z.object({
  creator: z.string(),
  name: z.string(),
  type: z.string(),
  company: z.string(),
  location: z.string(),
  salary: z.string(),
  detail: z.string(),
  requirement: z.string(),
});

export const jobsRouter = createTRPCRouter({
  fetch: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jobs.findMany();
  }),

  fetchById: publicProcedure.input(z.string()).query(({ctx, input}) => {
    return ctx.prisma.jobs.findUnique({where: {id:input}});
  }),

  create: protectedProcedure
    .input(jobsType)
    .mutation(async ({ ctx, input }) => {
      const creatorId = ctx.session.user.id;
      const jobs = await ctx.prisma.jobs.create({
        data: {
          creator: creatorId,
          name: input.name,
          type: input.type,
          company: input.company,
          location: input.location,
          salary: input.salary,
          detail: input.detail,
          requirement: input.requirement,
        },
      });

      return jobs;
    }),
});
