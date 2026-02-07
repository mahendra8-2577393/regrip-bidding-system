const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Auction = sequelize.define("Auction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: { type: DataTypes.STRING, allowNull: false },
  currentPrice: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: {
    type: DataTypes.ENUM("CREATED", "LIVE", "CLOSED"),
    defaultValue: "CREATED"
  },
  leadingBidder: { type: DataTypes.STRING }
});

module.exports = Auction;
