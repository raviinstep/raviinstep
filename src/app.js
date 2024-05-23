
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { sequelize, mongooseConnection } = require('../config/config'); 
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  if (sequelize) {
    try {
      await sequelize.authenticate();
      console.log('Connection to SQL database has been established successfully.');
      await sequelize.sync();
    } catch (error) {
      console.error('Unable to connect to the SQL database:', error);
    }
  }

  if (mongooseConnection) {
    try {
      await mongooseConnection;
      console.log('Connection to MongoDB has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to MongoDB:', error);
    }
  }

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
