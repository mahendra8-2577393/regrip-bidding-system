const jwt = require("jsonwebtoken");

let ioInstance = null;

const initBidSocket = (io) => {
  ioInstance = io;

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication error"));

      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(" Socket connected:", socket.user.name);

    // Dealer joins an auction room
    socket.on("join-auction", (auctionId) => {
      socket.join(`auction-${auctionId}`);
      console.log(
        `👤 ${socket.user.name} joined auction ${auctionId}`
      );
    });

    socket.on("leave-auction", (auctionId) => {
      socket.leave(`auction-${auctionId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.user.name);
    });
  });
};

/**
 * Emit bid update to all users watching that auction
 */
const emitBidUpdate = (auctionId, payload) => {
  if (!ioInstance) return;
  ioInstance
    .to(`auction-${auctionId}`)
    .emit("bid-update", payload);
};

module.exports = {
  initBidSocket,
  emitBidUpdate
};
