import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../sockets/socket";
import AuctionCard from "../components/AuctionCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { token } = useAuth();
  const [auction, setAuction] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeSocket;

    const init = async () => {
      try {
        // 🔹 Fetch active auction
        const res = await api.get("/api/auctions");
        const activeAuction = res.data[0]; // assuming 1 live auction
        setAuction(activeAuction);
        setLoading(false);

        // 🔹 Connect socket
        activeSocket = connectSocket(token);
        setSocket(activeSocket);

        // 🔹 Join auction room
        activeSocket.emit("join-auction", activeAuction.id);

        // 🔹 Listen for real-time bid updates
        activeSocket.on("bid-update", (data) => {
          setAuction((prev) =>
            prev && prev.id === data.auctionId
              ? { ...prev, ...data }
              : prev
          );
        });
      } catch (err) {
        console.error("Dashboard error:", err);
        setLoading(false);
      }
    };

    init();

    return () => {
      if (activeSocket) {
        activeSocket.emit("leave-auction", auction?.id);
        activeSocket.disconnect();
      }
    };
    // eslint-disable-next-line
  }, [token]);

  const placeBid = async (amount) => {
    if (!amount || amount <= auction.currentPrice) {
      alert("Bid must be higher than current price");
      return;
    }

    try {
      await api.post(`/api/bids/${auction.id}`, { amount });
    } catch (err) {
      alert(err.response?.data?.message || "Bid failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!auction) return <p>No active auction</p>;

  return (
    <>
      <Navbar />
      <AuctionCard auction={auction} onBid={placeBid} />
    </>
  );
}
