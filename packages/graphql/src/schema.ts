import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    age: Int
  }

  type Query {
    hello: String
    users: [User!]!
  }
`;
