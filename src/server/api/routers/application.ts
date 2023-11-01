import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const applicationType = z.object({
  jobId: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  birthdate: z.string(),
  nationality: z.string(),
  address: z.string(),
  gender: z.string(),
  fileUrl: z.string(),
});

export const applicationRouter = createTRPCRouter({
  create: publicProcedure
    .input(applicationType)
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.create({
        data: {
          jobId: input.jobId,
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          phone: input.phone,
          birthdate: input.birthdate,
          nationality: input.nationality,
          gender: input.gender,
          fileUrl: input.fileUrl,
        },
      });

      return application;
    }),
});
