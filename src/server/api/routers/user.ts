import { createTRPCRouter } from "../trpc";


export const userRouter = createTRPCRouter(
    {

    }

);

export type UserRouter = typeof userRouter;