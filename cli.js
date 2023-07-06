#!/usr/bin/env node

require('dotenv').config();
const program = require("commander");
const ethers = require("ethers");
const getSellerWallet = require("./ethers");
const getBuyerWallet = require("./ethers");

const marketplaceContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;
const _nftContractAddress = process.env.NFT_CONTRACT_ADDRESS;

const sellerWallet = getSellerWallet();
const buyerWallet = getBuyerWallet();

const marketplaceABI = require("./Marketplace.json");
const nftABI = require("./NFT.json");

const marketplaceSeller = new ethers.Contract(
  marketplaceContractAddress,
  marketplaceABI.abi,
  sellerWallet
);
const nft = new ethers.Contract(_nftContractAddress, nftABI.abi, sellerWallet);

program
  .command("mint")
  .description("Mint token and approve it to our Marketplace")
  .action(async () => {
    try {
      let mintTx = await nft
        .connect(sellerWallet)
        .safeMint(marketplaceContractAddress, sellerWallet.address);

      let mintTxReceipt = await mintTx.wait();
      if (mintTxReceipt.status != 1) {
        console.log("TX of minting token not successfull");
        return;
      } else {
        console.log("Tx successfull");
      }
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("list")
  .argument("<tokenId>", "ID of the listed token")
  .argument("<price>", "Listing price, in wei")
  .argument("[nftContractAddress]", "Address of the NFT collection for the token")
  .description("List NFT for sale")
  .action(async (tokenId, price, nftContractAddress) => {
    try {
      let nftContractAddr = _nftContractAddress;
      if (nftContractAddress) {
        nftContractAddr = nftContractAddress;
      }

      let listTx = await marketplaceSeller
        .connect(sellerWallet)
        .listNFT(tokenId, price, nftContractAddr);

      let listTxReceipt = await listTx.wait();
      if (listTxReceipt.status != 1) {
        console.log("TX of listing not successfull");
        return;
      } else {
        console.log("Tx successfull");
      }
    } catch (error) {
      console.log(error);
    }
  });

program
  .command("buy")
  .argument("<tokenId>", "ID of the token to buy")
  .argument("[nftContractAddress]", "Address of the NFT collection for the token")
  .description("Buy listed NFT for sale")
  .action(async (tokenId, nftContractAddress) => {
    try {
      let nftContractAddr = _nftContractAddress;
      if (nftContractAddress) {
        nftContractAddr = nftContractAddress;
      }

      const listing = await marketplaceSeller.listings(
        nftContractAddr,
        tokenId
      );

      let buyTx = await marketplaceSeller
        .connect(buyerWallet)
        .buyNFT(tokenId, nftContractAddr, { value: listing });

      let buyTxReceipt = await buyTx.wait();
      if (buyTxReceipt.status != 1) {
        console.log("TX buy not successfull");
        return;
      } else {
        console.log("Tx successfull");
      }
    } catch (error) {
      console.log(error);
    }
  });

program
  .command("cancel")
  .argument("<tokenId>", "ID of the token to cancel its listing")
  .argument("[nftContractAddress]", "Address of the NFT collection for the token")
  .description("Cancel NFT listing")
  .action(async (tokenId, nftContractAddress) => {
    try {
      let nftContractAddr = _nftContractAddress;
      if (nftContractAddress) {
        nftContractAddr = nftContractAddress;
      }

      let canceltTx = await marketplaceSeller
        .connect(sellerWallet)
        .cancelListing(tokenId, nftContractAddr);

      let cancelTxReceipt = await canceltTx.wait();
      if (cancelTxReceipt.status != 1) {
        console.log("TX cancel not successfull");
        return;
      } else {
        console.log("Tx successfull");
      }
    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);
