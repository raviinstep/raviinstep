    
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const rolesSchema = new Schema({
        key: { type: String, required: true,  },
        title: { type: String, required: true },
   
    });
    
    const Roles = mongoose.model('Roles', rolesSchema);
    
    module.exports = Roles;
    