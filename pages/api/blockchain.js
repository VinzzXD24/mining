const crypto = require('crypto');

let blockchain = [];
let coinState = {
  currentCoinSupply: 0.0,
};

const TOTAL_COIN_SUPPLY = 1000000; // 1 juta coin
const BLOCK_REWARD = 0.0000000001;
const DIFFICULTY_PREFIX = '0000';

function createGenesisBlock() {
  const genesisBlock = {
    index: 0,
    previousHash: '0',
    timestamp: Date.now(),
    data: 'Genesis Block',
    nonce: 0,
    hash: ''
  };
  genesisBlock.hash = calculateHash(genesisBlock);
  return genesisBlock;
}

function calculateHash({ index, previousHash, timestamp, data, nonce }) {
  const blockString = `${index}${previousHash}${timestamp}${data}${nonce}`;
  return crypto.createHash('sha256').update(blockString).digest('hex');
}

function getLatestBlock() {
  return blockchain[blockchain.length - 1];
}

function addBlock(newBlock) {
  blockchain.push(newBlock);
}

function mineBlock() {
  if (coinState.currentCoinSupply + BLOCK_REWARD > TOTAL_COIN_SUPPLY) {
    return null;
  }
  const previousBlock = getLatestBlock();
  const newBlock = {
    index: previousBlock.index + 1,
    previousHash: previousBlock.hash,
    timestamp: Date.now(),
    data: `Block #${previousBlock.index + 1} mining reward: ${BLOCK_REWARD}`,
    nonce: 0,
    hash: ''
  };

  newBlock.hash = calculateHash(newBlock);
  while (!newBlock.hash.startsWith(DIFFICULTY_PREFIX)) {
    newBlock.nonce++;
    newBlock.hash = calculateHash(newBlock);
  }

  coinState.currentCoinSupply += BLOCK_REWARD;
  addBlock(newBlock);
  return newBlock;
}

// Inisialisasi blockchain dengan genesis block jika belum ada
if (blockchain.length === 0) {
  blockchain.push(createGenesisBlock());
}

module.exports = {
  blockchain,
  mineBlock,
  coinState,
  TOTAL_COIN_SUPPLY,
  BLOCK_REWARD
};
