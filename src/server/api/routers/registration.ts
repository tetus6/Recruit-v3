import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";



const registrationType = z.object({
  creator: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  birthdate: z.string(),
  nationality: z.string(),
  address: z.string(),
  gender: z.string(),
  desiredOccupation: z.string(),
  desiredLocation: z.string(),
  desiredSalary: z.string(),
  jobID: z.string(),
  file: z.string(),
});

export const registrationRouter = createTRPCRouter({
  fetch: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.registrations.findMany();
  }),

  create: protectedProcedure
    .input(registrationType)
    .mutation(async ({ ctx, input }) => {
      
      // not sure whether need to use the ctx.prisma.$connect or not
      const creatorId = ctx.session.user.id;
      const registration = await ctx.prisma.registrations.create({
        data: {
          creator: creatorId,
          firstname: input.firstname,
          lastname: input.lastname,
          phone: input.phone,
          birthdate: input.birthdate,
          nationality: input.nationality,
          address: input.address,
          gender: input.gender,
          desiredOccupation: input.desiredOccupation,
          desiredLocation: input.desiredLocation,
          desiredSalary: input.desiredSalary,
          jobID: input.jobID,
          file: input.file,
        },
      });

      return registration;
    }),

    // findExisting: publicProcedure.query(({ ctx }) => {
    //   return ctx.prisma.registrations.find
    // }),
});

