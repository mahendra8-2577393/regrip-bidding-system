import React from "react";
import BidInput from "./BidInput";

export default function AuctionCard({ auction, onBid }) {
  return (
    <div className="card">
      <h3>{auction.title}</h3>
      <p>Price: ₹{auction.currentPrice}</p>
      <p>Leader: {auction.leadingBidder || "-"}</p>
      <BidInput onBid={onBid} />
    </div>
  );
}
