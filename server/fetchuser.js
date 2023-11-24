const express = require('express');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const fetchuser = express.Router().post('/', async (req, res) => {
  try {
    const id= req.body.id;

    client.connect("mongodb://localhost:27017/Scoretracker", async (err, db) => {
      if (err) {
        throw err;
      } else {
        db.collection('users').find({id:id}).toArray((err,result)=>{
            if(err){
                throw err;
            }
            else{
                if(result.length>0)
                {
                    res.send(result);
                }
                else{
                    res.send({message:"record not found"})
                }
            }
        });

      }
    });
  } catch (error) {
   
  }
});

module.exports = fetchuser;
