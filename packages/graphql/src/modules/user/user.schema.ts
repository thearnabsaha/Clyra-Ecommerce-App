import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    age: Int
  }

  type Query {
    users: [User!]!
    sayName(username: String!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, age: Int): User
  }
`;
