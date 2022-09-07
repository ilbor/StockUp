const express = require("express");
const morgan = require("morgan");

const {
  addUser,
  followTicker,
  followedTickers,
  updateFollowedTickers,
} = require("./handlers");

const app = express();

// app.use(function(req, res, next) {
//     res.header(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, HEAD, GET, PUT, POST, DELETE'
//     );
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hi", (rep, res) => {
        res.status(200).json({status: 200, message: "success"});
});

app.post("/api/add-user", addUser);
app.post("/api/follow-ticker", followTicker);
app.get("/api/followed-tickers/:email", followedTickers);
app.patch("/api/update-followed-tickers/:email", updateFollowedTickers);

app.listen(8000, () => {
    console.log("server launched on port 8000");
});