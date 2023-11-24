const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const bcrypt = require('bcrypt'); // Import the bcrypt library

const login = express.Router().post('/', (req, res) => {
  client.connect('mongodb://localhost:27017/Scoretracker', (err, db) => {
    if (err) {
      throw err;
    } else {
      const { email, password } = req.body;

      db.collection('users').findOne({ email }, (err, result) => {
        if (err) {
          throw err;
        } else if (result === null) {
          res.send(false); // User not found
        } else {
          // Compare the provided password with the hashed password in the database
          bcrypt.compare(password, result.password, (err, isMatch) => {
            if (err) {
              throw err;
            } else if (isMatch) {
              const id = result.id;
              res.send({ success: true, id });
            } else {
              res.send(false); // Passwords do not match
            }
          });
        }
      });
    }
  });
});

module.exports = login;
