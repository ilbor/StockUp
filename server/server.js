const express = require("express");
const { AggregationCursor } = require("mongodb");

const app = express();

app.get("/hi", (rep, res) => {
        res.status(200).json({status: 200, message: "success"});
});

app.listen(8000, () => {
    console.log("server launched on port 8000");
});