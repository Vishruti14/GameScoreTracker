const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const updateScore = express.Router().put('/', (req, res) => {
    const { id, gamename, score } = req.body;

    client.connect('mongodb://localhost:27017/Scoretracker', (err, db) => {
        if (err) {
            throw err;
        } else {
            db.collection('games').updateOne(
                { id, gamename },
                { $set: { score: score } },
                (err, result) => {
                    if (err) {
                        throw err;
                    } else if (result.modifiedCount === 1) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                }
            );
        }
    });
});

module.exports = updateScore;
