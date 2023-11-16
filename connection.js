const mysql = require('mysql2');


//Make a Mysql connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
database:'employee_db'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = con;
