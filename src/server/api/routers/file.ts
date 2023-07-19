import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";
import { z } from "zod";

const s3Client = new S3Client({
  region: env.REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const fileRouter = createTRPCRouter({
  createPresignedUrl: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // const registrations = await ctx.prisma.registrations.findUnique({
      //   where: {
      //     id: input.registrationsId,
      //   },
      // });

      // if (!registrations) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "this registration does not exist",
      //   });
      // }
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you must be logged in!",
        });
      }

      const userId = ctx.session.user.id;

      const file = await ctx.prisma.file.create({
        data: {
          creator: userId,
          url: "",
        },
      });

      await ctx.prisma.file.update({
        where: {
          id: file.id,
        },
        data: {
          url: `https://${env.BUCKET_NAME}/${userId}/${file.id}`,
        },
      });

      return createPresignedPost(s3Client, {
        Bucket: env.BUCKET_NAME,
        Key: `${userId}/${file.id}`,
        Fields: {
          key: `${userId}/${file.id}`,
          "Content-Type": input,
        },
        Conditions: [["content-length-range", 0, 10485760]], //up to 10 MB
        Expires: 60,
      });
    }),

  // uploadPdf: protectedProcedure.mutattion(async ({ ctx }) => {
  //   if (!ctx.session) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "you must be logged in!",
  //     });
  //   }

  //   const s3 = new AWS.S3();
  // }),
  getFileUrl: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
  
    const file = await ctx.prisma.file.findFirst({
      where: {
        creator: userId,
      },
    });
  
    if (file) {
      return file.url;
    } else {
      return null; // or handle the case when no file is found
    }
  }),
  
});
