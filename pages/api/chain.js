// /pages/api/chain.js
const { blockchain, coinState } = require('./blockchain');

export default function handler(req, res) {
  res.status(200).json({
    chain: blockchain,
    length: blockchain.length,
    totalCoin: coinState.currentCoinSupply
  });
}
