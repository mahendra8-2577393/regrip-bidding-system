const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Bid = sequelize.define("Bid", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  bidderName: { type: DataTypes.STRING, allowNull: false },
  auctionId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = Bid;
