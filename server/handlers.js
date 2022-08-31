//Mongo Setup
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {};
const client = new MongoClient(MONGO_URI,options);

// Adds user to the Database
const addUser = async(req, res) => {
    try {
        await client.connect();
        const db = client.db("StockUp");
        const serverData = await db.collection("users").find({ email: req.body.email }).toArray();
        console.log(serverData);
        if (serverData.length){
            res.status(400).json({status:"error", message: "That email already exists"});
        } else {
            const userData = await db.collection("users").insertOne(req.body);
            res.status(200).json({status:"success", user: req.body});
        }
        client.close();
    } catch (err) {
        client.close();
        res.status(404).json({status:"error", message:err.message});
    }
}

module.exports = {
    addUser,
}
