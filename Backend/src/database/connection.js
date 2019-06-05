const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sibgu",
    password: "2171013",
    charset: "utf8"
})

connection.query("SET NAMES 'utf8'");
connection.query("SET CHARACTER SET 'utf8'")
connection.setCharSet


module.exports = connection;
