// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    password:String!
    roleId: Int!
    token: String!
  }

  type Role {
    key: String!
    title: String!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    register(userName: String!, email: String!, password: String!, role: String!): User!
    addRole(key: String!, title: String!): Role!
    login(email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
