const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/auctions", require("./routes/auction.routes"));
app.use("/api/bids", require("./routes/bid.routes"));

app.get("/health", (_, res) => res.json({ status: "OK" }));

module.exports = app;
