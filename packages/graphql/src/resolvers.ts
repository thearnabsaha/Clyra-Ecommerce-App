import { userResolvers } from './modules/user/user.resolvers';
// import { productResolvers } from './modules/product/product.resolvers';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    // ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    // ...productResolvers.Mutation,
  }
};
