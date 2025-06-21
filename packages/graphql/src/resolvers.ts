import { prisma } from '@workspace/database/client'
export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL in TurboRepo!',
    user: async (name:string) => {
      const data=await prisma.user.findFirst({where:{username:name}});
      return data;
    },
    users: async () => {
      return await prisma.user.findMany();
    },
  },
};
