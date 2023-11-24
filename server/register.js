const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const bcrypt = require('bcrypt'); // Import the bcrypt library

const register = express.Router().post('/', (req, res) => {
  client.connect('mongodb://localhost:27017/Scoretracker', (err, db) => {
    if (err) {
      throw err;
    } else {
      db.collection('users').findOne({}, { sort: { id: -1 } }, (err, highestIdUser) => {
        if (err) {
          throw err;
        } else {
          const nextId = highestIdUser ? highestIdUser.id + 1 : 1;

          // Hash the password
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              throw err;
            } else {
              const userData = {
                id: nextId,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword, // Store the hashed password in the database
              };

              db.collection('users').insertOne(userData, (err, result) => {
                if (err) {
                  throw err;
                } else {
                  res.send(true);
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = register;
