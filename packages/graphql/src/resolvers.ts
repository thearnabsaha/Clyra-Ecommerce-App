import { prisma } from '@workspace/database/client'
export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL in TurboRepo!',
    users: async () => {
      return await prisma.user.findMany();
    },
  },
};
