const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const client = mongodb.MongoClient;

const updateUser = express.Router().put('/', (req, res) => {
    client.connect('mongodb://localhost:27017/Scoretracker', (err, db) => {
        if (err) {
            throw err;
        } else {
            const { id, name, email, password } = req.body;
            bcrypt.hash(password, 5, (err, hashedPassword) => {
                if (err) {
                    throw err;
                }
                else {
                    const newValues = { $set: { name: name, email: email, password: hashedPassword } }

                    db.collection('users').updateOne({ id }, newValues, (err, result) => {
                        if (err) {
                            throw err;
                        } else if (result.modifiedCount === 1) {
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                    });
                
                }
            });
        }             
            })
        });
    

module.exports = updateUser;
