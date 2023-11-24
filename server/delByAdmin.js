const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const delByAdmin = express.Router().delete('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    client.connect("mongodb://localhost:27017/Scoretracker", (err, db) => {
      if (err) {
        throw err;
      } else {

        db.collection("users").deleteOne({ id: userId }, (err, result) => {
          if (err) {
            throw err;
          }

          db.collection("games").deleteMany({ id: userId }, (err, result) => {
            if (err) {
              throw err;
            }

            if (result.deletedCount === 1) {
              res.send({ message: "User and associated game data deleted successfully" });
            } else {
              res.send({ message: "User not found" });
            }
          });
        });
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: "An error occurred while deleting the user." });
  }
});

module.exports = delByAdmin;
