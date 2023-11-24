const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const fetchadmin = express.Router().get('/', async (req, res) => {
    try {
        client.connect("mongodb://localhost:27017/Scoretracker", async (err, db) => {
            if (err) {
                throw err;
            } else {
                db.collection("users").aggregate([
                    {
                        $lookup: {
                            from: "games",
                            localField: "id",
                            foreignField: "id",
                            as: "gamesInfo"
                        }
                    },
                    {
                        $project: {
                            id: 1, // Include the user's MongoDB ID
                            name: 1,
                            email: 1,
                            gamesInfo: 1,
                            totalScore: {
                                $sum: "$gamesInfo.score" // Calculate the total score for each user
                            }
                        }
                    },
                    {
                        $sort: { totalScore: -1 } // Sort users by totalScore in descending order
                    }
                ]).toArray((err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        if (result.length > 0) {
                            res.send(result);
                        } else {
                            res.send({ message: "record not found" });
                        }
                    }
                });
            }
        });
    } catch (error) {
    }
});

module.exports = fetchadmin;
