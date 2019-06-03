const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING(45)
    },
    password: {
        type: Sequelize.STRING(45)
    }
},
{
    timestamps: false
});
