const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize("sibgu","root","12345",{    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
