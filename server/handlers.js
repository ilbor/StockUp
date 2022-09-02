//Mongo Setup
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {};
const client = new MongoClient(MONGO_URI,options);

// Adds user to the Database
const addUser = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("StockUp");
        const serverData = await db.collection("users").find({ email: req.body.email }).toArray();
        console.log(serverData);
        if (serverData.length){
            res.status(400).json({status:"error", message: "That email already exists"});
        } else {
            await db.collection("users").insertOne(req.body);
            await db.collection("tickers").insertOne({email: req.body.email, tickers: []});
            res.status(200).json({status:"success", user: req.body});
        }
        client.close();
    } catch (err) {
        client.close();
        res.status(404).json({status:"error", message:err.message});
    }
}

const followTicker = async (req, res) => {
    try {
        const {email} = req.body;
        const {ticker} = req.body;
        await client.connect();
        const db = client.db("StockUp");
        const findEmail = await db.collection("tickers").find({ email: req.body.email }).toArray();
        console.log(findEmail);
        if (findEmail.length !== 0){
            const updatedTickers = findEmail[0].tickers.push({name: ticker, isFollowing: true, amount: 0});
            console.log(findEmail[0].tickers);
            // console.log(updatedTickers);
            const serverData = await db.collection("tickers").update({email: email}, {$set: {tickers: findEmail[0].tickers} });
            res.status(200).json({status:"success", user: req.body});
        } else {
            const serverData = await db.collection("tickers").insertOne({email, tickers: [{name: ticker, isFollowing: true, amount: 0}]});
            res.status(200).json({status:"success", user: req.body});
        }
        client.close();
    } catch (err) {
        client.close();
        res.status(404).json({status:"error", message:err.message});
    }
}

// For the array
const followedTickers = async (req, res) => {
    const email = req.params.email;
    try{
        await client.connect();
        const db = client.db("StockUp");
        const filteredArray = await db.collection("tickers").find({email:email}).toArray();
        const tickers = filteredArray[0].tickers;
        const arrayOfTickers = tickers.map(a => a.name);
        client.close();
        res.status(200).json({ status: 200, arrayOfTickers , message: {success: "the requested data"}  })
    }
    catch (err){
        client.close();
        res.status(400).json({status: 400, error: err.message})
    }
};

module.exports = {
    addUser,
    followTicker,
    followedTickers,
}
