require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB, sequelize } = require("./config/db");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: { origin: "*" }
});

const { initBidSocket } = require("./sockets/bid.socket");

initBidSocket(io); //  socket initialized

(async () => {
  await connectDB();
  await sequelize.sync();
  server.listen(process.env.PORT, () =>
    console.log("Backend running on port", process.env.PORT)
  );
})();
