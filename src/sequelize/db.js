const { Sequelize, DataTypes } = require('sequelize');
const connections = require('./connections');
const config = require("../config/keys");

const modelDefiners = [  
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