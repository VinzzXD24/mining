// /pages/api/mine.js
const { mineBlock, coinState } = require('./blockchain');

export default function handler(req, res) {
  const newBlock = mineBlock();
  if (newBlock === null) {
    res.status(400).json({ message: "Total coin supply reached limit." });
  } else {
    res.status(200).json({
      message: "Block mined successfully!",
      block: newBlock,
      totalCoin: coinState.currentCoinSupply
    });
  }
}
