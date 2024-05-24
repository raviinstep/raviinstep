// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Role {
    key: String!
    title: String!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    addRole(key: String!, title: String!): Role!
  }
`;

module.exports = typeDefs;
