const bcrypt = require('bcrypt');
const  {User}  = require('../../models');
const UserMongo= require('../models/user'); 
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

  async createUser({ userName, email, password, roleId }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (this.dbType === 'postgres') {
      return await User.create({
        userName,
        email,
        password: hashedPassword,
        roleId,
      });
    } else if (this.dbType === 'mongodb') {
      return await UserMongo.create({
        userName,
        email,
        password: hashedPassword,
        roleId,
      });
    }
  }
}

module.exports = UserService;
