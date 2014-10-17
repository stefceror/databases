CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  ID int(11) NOT NULL auto_increment,
  messageText VARCHAR(140),
  userId int(11) NOT NULL,
  roomId int(11),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  ID int(11) NOT NULL auto_increment,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE rooms (
  ID int(11) NOT NULL auto_increment,
  roomName VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE friends (
  ID int(11) NOT NULL auto_increment,
  userId int(11) NOT NULL,
  friendId int(11) NOT NULL,
  PRIMARY KEY (ID)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




