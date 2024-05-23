
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolver');
const { mongooseConnection,sequelize} = require('../config/config'); 

require('dotenv').config();

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  if (mongooseConnection) {
    try {
      await mongooseConnection;
      console.log('MongoDB connected successfully.');
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
      });
    } catch (error) {
      console.error('Unable to connect to MongoDB:', error);
      process.exit(1); 
    }
  } else {
    app.listen(PORT, async () => {
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
      
      if (sequelize) {
        try {
          await sequelize.authenticate();
          await sequelize.sync();
          console.log('SQL database connected successfully.');
        } catch (error) {
          console.error('Unable to connect to the SQL database:', error);
        }
      }
    });
  }
};

startServer();







