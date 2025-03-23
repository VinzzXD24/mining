import { mineBlock, coinState } from "./blockchain";

export default function handler(req, res) {
  const newBlock = mineBlock();
  if (newBlock === null) {
    return res.status(400).json({ message: "Total coin supply reached limit." });
  }
  res.status(200).json({
    message: "Block mined successfully!",
    block: newBlock,
    totalCoin: coinState.currentCoinSupply,
  });
}
