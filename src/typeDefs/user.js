const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    password:String!
    roleId: Int!
    token: String!

  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(userName: String!, email: String!): User
  }
`;
