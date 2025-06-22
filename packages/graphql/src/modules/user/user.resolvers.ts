import { prisma } from '@workspace/database/client';

export const userResolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    sayName: (_: any, { username }: { username: string }) =>
      prisma.user.findFirst({ where: { username } }),
  },
  Mutation: {
    signup: async (_: any, args: any) => {
      const { username, email, password, age } = args;
      return await prisma.user.create({
        data: { username, email, password, age },
      });
    },
  },
};
