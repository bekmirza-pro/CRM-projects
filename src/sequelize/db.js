const { Sequelize, DataTypes } = require('sequelize');
const connections = require('./connections');
const config = require("../config/keys");

const modelDefiners = [  
  require('../sequelize/models/users/user_sessions'),
  require('../sequelize/models/users/users'),
  require('../sequelize/models/roles/role'),
  require('../sequelize/models/users/user_roles'),
  require('../sequelize/models/groups/group'),
  require('../sequelize/models/attendance/attendance'),
  require('../sequelize/models/lessons/lessons'),
  require('../sequelize/models/courses/course'),
  require('../sequelize/models/payments/payments'),
  require('../sequelize/models/modules')
];

const sequelize = new Sequelize(config.DB_CONNECTION_URL, {
  logging: false,
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
}) 

async function define(){
  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, DataTypes);
  }
}

;(
  async ()=> {
    await define().then(() => connections(sequelize))  
  }
)();



module.exports = sequelize