const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../resolver/userService');
require('dotenv').config();


const resolvers = {
  Query: {
    _: () => true,
  },
  Mutation: {
    register: async (_, { userName, email, password, role }) => {
      const dbType = process.env.DATABASE_TYPE;
      const userService = new UserService(dbType);

      try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
          throw new Error('User with this email already exists');
        }
      
        const user = await userService.createUser({
          userName,
          email,
          password,
          role,
        });

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME }
        );
        return {
          id: user.id,
          userName: user.userName,
          email: user.email,
          token,
        };
      } catch (error) {
        console.log(error, 'error')
        throw new Error('Error creating user: ' + error.message);
      }
    },
    login: async (_, { email, password }) => {
      const dbType = process.env.DATABASE_TYPE;
      const userService = new UserService(dbType);

      try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
          throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME }
        );

        return {
          id: user.id,
          userName: user.userName,
          email: user.email,
          roleId: user.roleId,
          token,
        };
      } catch (error) {
        throw new Error('Error logging in: ' + error.message);
      }
    },

    addRole: async (_, { key, title }) => {
      const dbType = process.env.DATABASE_TYPE;
      const userService = new UserService(dbType);

      try {
        const roles = await userService.createRoles({ key, title });

        return {
          key: roles.key,
          title: roles.title,

        };
      } catch (error) {
        throw new Error('Error logging in: ' + error.message);
      }
    },

  },
};

module.exports = resolvers;
