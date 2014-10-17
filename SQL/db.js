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
  dbConnection.query(
    'SELECT messages.messageText, users.name, rooms.roomname, messages.createdAt, messages.ID ' +
    'FROM messages ' +
    'INNER JOIN (users, rooms) ' +
    'ON (messages.userID =  users.ID AND messages.roomId = rooms.ID);',
    function(err, rows, fields){
      if(err){ throw err; }
      var results = {};
      results.results = rows;
    cb(err, results);
    });
};


exports.findUser = function(username, cb){
  dbConnection.query(
    'SELECT ID ' +
    'FROM users ' +
    'WHERE name = "'+ username + '";',
    function(err, rows, fields){
      if(err){ throw err; }
      cb(err, rows);
    });
};


exports.saveUser = function(username, cb){
  dbConnection.query(
  'INSERT INTO users (name) VALUES ("'+ username +'");',
  function(err, rows, fields){
    if(err){
      throw err;
    }
    exports.findUser(username, cb);
  });
};


exports.findRoom = function(roomname, cb){
  dbConnection.query(
  'SELECT ID FROM rooms WHERE roomname = "' + roomname + '";',
  function(err, results){
    if(err){ throw err; }
    if (!results || !results.length) {
      // create the room, then continue the hell
      exports.saveRoom(roomname, cb);
    } else {
      // room exists, pass back ID
      cb(err, results);
    }
  });
};


exports.saveRoom = function(roomname, cb){
  dbConnection.query(
  'INSERT INTO rooms (roomname) VALUES ("' + roomname + '");',
  function(err, results){
    if(err){ throw err; }
    exports.findRoom(roomname, cb);
  });
};


exports.saveMessage = function(message, userid, roomname, cb){
  exports.findRoom(roomname, function(err, results){
    dbConnection.query(
    'INSERT INTO messages (messageText, userID, roomID) ' +
    'VALUES ("' + message + '","' + userid + '","' + results[0].ID + '");',
    function(err, results){
      if(err){ throw err; }
      dbConnection.query('SELECT LAST_INSERT_ID();',
        function(err, result){
          if(err){ throw err; }
          var id = 'LAST_INSERT_ID()';
          exports.findOneMessage(result[0][id], cb);
      });
    });
  });
};


exports.findOneMessage = function(messageID, cb){
  dbConnection.query(
  'SELECT messages.messageText, users.name, rooms.roomname, messages.createdAt, messages.ID ' +
  'FROM messages ' +
  'INNER JOIN (users, rooms) ' +
  'ON (messages.userId =  users.ID AND messages.roomId = rooms.ID) ' +
  'WHERE messages.ID =' + messageID + ';',
  function(err, rows, fields){
    if(err){ throw err; }
    var results = {};
    results.results = rows;
    cb(err, results);
  });
};
