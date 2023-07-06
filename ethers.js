require('dotenv').config();
const { ethers } = require('ethers');
const infuraApiKey = process.env.INFURA_API_KEY;
const privateKeySeller = process.env.PRIVATE_KEY_SELLER;
const privateKeyBuyer = process.env.PRIVATE_KEY_BUYER;

function getSellerWallet() {
    const provider = new ethers.providers.InfuraProvider('goerli', infuraApiKey);
    const wallet = new ethers.Wallet(privateKeySeller, provider);
    return wallet;
}

function getBuyerWallet() {
    const provider = new ethers.providers.InfuraProvider('goerli', infuraApiKey);
    const wallet = new ethers.Wallet(privateKeyBuyer, provider);
    return wallet;
}

module.exports = getSellerWallet, getBuyerWallet;