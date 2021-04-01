/*
* config.Db contains the parameters for the connection to the database
* It uses the mysql module
* It creates a usable connection's pool
* the method getConnection permits the connection to MySQL
*
*/

let mysql = require('mysql');

let pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  //password :'root',
  database : 'vip',
  port : "3306"
});

module.exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
        if (err) {
            console.log(err);
            return;
        }
    });
};
