var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "chatterbox",
  password: "chatterbox1",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  console.log('FindAllMesg Ran');
  dbConnection.query(
    'SELECT messages.messageText, users.name, rooms.roomname, messages.createdAt, messages.ID ' +
    'FROM messages ' +
    'INNER JOIN (users, rooms) ' +
    'ON (messages.userID =  users.ID AND messages.roomId = rooms.ID);', function(err, rows, fields){
      var results = {};
      results.results = rows;
    cb(err, results);
    });
};

exports.findUser = function(username, cb){
};

exports.saveUser = function(username, cb){
};

exports.saveMessage = function(message, userid, roomname, cb){
};
