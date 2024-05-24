const bcrypt = require('bcrypt');
const { User,Role } = require('../../models');
const UserMongo = require('../models/user');
const Roles = require('../models/roles')

class UserService {
  constructor(dbType) {
    this.dbType = dbType;
  }
  async findUserByEmail(email) {
    if (this.dbType === 'postgres') {
      return await User.findOne({ where: { email } });
    } else if (this.dbType === 'mongodb') {
      return await UserMongo.findOne({ email });
    }
  }

  async createUser({ userName, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (this.dbType === 'postgres') {

      let roleData = await Role.findOne({
        key: role
      })
      return await User.create({
        userName,
        email,
        password: hashedPassword,
        roleId:roleData.id,
      });
    } else if (this.dbType === 'mongodb') {
      let roleData = await Roles.findOne({
        key: role
      })
      return await UserMongo.create({
        userName,
        email,
        password: hashedPassword,
        roleId: roleData._id,
      });
    }
  }

  async createRoles({ key, title }) {
    if (this.dbType === 'mongodb') {
      return await Roles.create({
        key,
        title
      });
    }
  }




}

module.exports = UserService;
