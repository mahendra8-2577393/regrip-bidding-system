const { Auction } = require("../models");

exports.createAuction = async (req, res) => {
  const auction = await Auction.create({ title: req.body.title });
  res.json(auction);
};

exports.startAuction = async (req, res) => {
  const auction = await Auction.findByPk(req.params.id);
  auction.status = "LIVE";
  await auction.save();
  res.json(auction);
};

exports.getAuctions = async (req, res) => {
  const auctions = await Auction.findAll({
    where: { status: "LIVE" }
  });
  res.json(auctions);
};

