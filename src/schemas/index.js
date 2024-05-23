const { mergeTypeDefs } = require('@graphql-tools/merge');
const userSchema = require('./userSchema');

const typeDefs = mergeTypeDefs([userSchema]);

module.exports = typeDefs;
