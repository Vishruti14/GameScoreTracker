const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const addgame = express.Router().post('/', async (req, res) => {
  try {
    const { id, gamename, score } = req.body;

    if (!mongodb.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    client.connect("mongodb://localhost:27017/Scoretracker", async (err, db) => {
      if (err) {
        throw err;
      } else {
        const userCollection = db.collection('users');

        const existingUser = await userCollection.findOne({ id: id });

        if (!existingUser) {
          return res.status(404).json({ error: 'User not found.' });
        }

        const gameCollection = db.collection('games');
        const result = await gameCollection.insertOne({
          id: id,
          gamename: gamename,
          score: score,
        });

        res.send(true);
      }
    });
  } catch (error) {
    console.error(error);
    res.send(false)
  }
});

module.exports = addgame;
