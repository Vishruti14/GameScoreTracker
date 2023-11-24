let express=require('express');
let mongodb=require('mongodb');
let client=mongodb.MongoClient;

let deleteData=express.Router().delete('/',(req,res)=>{
    client.connect("mongodb://localhost:27017/Scoretracker", (err, db) => {
        if (err) {
            throw err;
        }
        else {
            const {id,gamename,score}=req.body;
            db.collection('games').deleteOne({id,gamename,score}, (err, result) => {
                if (err) {
                    throw err
                }
                else if (result.deletedCount === 1) {
                    res.send(true); 
                  } else {
                    res.send(false);
                  }
            })
        }
    })
})
module.exports=deleteData;