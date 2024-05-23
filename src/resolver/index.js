const { mergeResolvers } = require('@graphql-tools/merge');
const userResolver = require('./userResolver');

const resolvers = mergeResolvers([userResolver]);

module.exports = resolvers;
