//Mongo Setup
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const {MONGO_URI} = process.env;
const options = {};
const client = new MongoClient(MONGO_URI,options);

// Adds user to the Database
const addUser = async (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    try {
        await client.connect();
        const db = client.db("StockUp");
        const serverData = await db.collection("users").findOne({ email: email });
        console.log(serverData);
        if (serverData){
            res.status(400).json({status:"error", message: "That email already exists"});
        } else {
            await db.collection("users").insertOne(req.body);
            await db.collection("tickers").insertOne({email: email, tickers: []});
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
        const {email, ticker} = req.body;
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

// To get an array of followed ticker
const followedTickers = async (req, res) => {
    const email = req.params.email;
    try{
        await client.connect();
        const db = client.db("StockUp");
        const filteredArray = await db.collection("tickers").find({email:email}).toArray();
        const tickers = filteredArray[0].tickers;
        // const arrayOfTickers = tickers.map(a => a.name);
        res.status(200).json({ status: 200, tickers , message: {success: "the requested data"}  })
        client.close();
    }
    catch (err){
        client.close();
        res.status(400).json({status: 400, error: err.message})
    }
};

const updateFollowedTickers = async (req, res) => {
    const email = req.params.email;
    const name = req.body.name;
    const amount = req.body.amount;
    const array = req.body.array;
    console.log(req.body.array[0].name);
    try{
        await client.connect();
        const db = client.db("StockUp");
        const filteredArray = await db.collection("tickers").find({email:email}).toArray();
        let arrayOfTickers = filteredArray[0].tickers;
        array.forEach( (element) => {
            arrayOfTickers = arrayOfTickers.map(a => {
                if (a.name === element.name) {
                    a.amount = parseInt(element.amount);
                }
                return a
            });
        })
        console.log(arrayOfTickers);
        await db.collection("tickers").update({email:email}, {$set: {tickers: arrayOfTickers}});
        res.status(200).json({ status: 200, arrayOfTickers , message: {success: "the requested data"}  })
        client.close();
    }
    catch (err){
        client.close();
        res.status(400).json({status: 400, error: err.message})
    }
}

module.exports = {
    addUser,
    followTicker,
    followedTickers,
    updateFollowedTickers,
}
