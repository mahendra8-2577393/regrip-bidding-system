import React, { useState } from "react";

export default function BidInput({ onBid }) {
  const [amount, setAmount] = useState("");

  return (
    <>
      <input
        placeholder="Bid amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => onBid(Number(amount))}>Bid</button>
    </>
  );
}
