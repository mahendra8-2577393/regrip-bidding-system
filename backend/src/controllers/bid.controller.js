const { sequelize } = require("../config/db");
const { Auction, Bid } = require("../models");
const { emitBidUpdate } = require("../sockets/bid.socket"); // ADD THIS

exports.placeBid = async (req, res) => {
  const { amount } = req.body;
  const auctionId = req.params.id;

  try {
    let updatedAuction; //transaction ke baad emit ke liye

    await sequelize.transaction(async (t) => {
      const auction = await Auction.findByPk(auctionId, {
        transaction: t,
        lock: t.LOCK.UPDATE
      });

      if (!auction || auction.status !== "LIVE")
        throw new Error("Auction not live");

      if (amount <= auction.currentPrice)
        throw new Error("Bid too low");

      auction.currentPrice = amount;
      auction.leadingBidder = req.user.name;
      await auction.save({ transaction: t });

      await Bid.create(
        {
          amount,
          bidderName: req.user.name,
          auctionId
        },
        { transaction: t }
      );

      updatedAuction = auction; // save for socket emit
    });

    // REAL-TIME UPDATE (AFTER SUCCESSFUL COMMIT)
    emitBidUpdate(auctionId, {
      auctionId,
      currentPrice: updatedAuction.currentPrice,
      leadingBidder: updatedAuction.leadingBidder
    });

    res.json({ message: "Bid placed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
