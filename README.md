# NFT Marketplace CLI tool

## Overview

This CLI tool is used as interface for the Marketplace contract. It is made as Node.js project, using commander.js library for cli part and ethers.js for communication with the smart contract.

## Requirements

`npm install ethers commander dotenv`

In the .env file there are private keys of two accounts - seller and buyer, addresses of the Marketplace and NFT contract and Infura API key.

## Usage

The cli tool has 4 commands, one for minting NFT, which interacats with the NFT contract, and functions for list, buy and cancel listing:

```
ilkobg@ilkobg:~/lime/cli-marketplace$ node cli.js -h
Usage: cli [options] [command]

Options:
  -h, --help                                   display help for command

Commands:
  mint                                         Mint token and approve it to our Marketplace
  list <tokenId> <price> [nftContractAddress]  List NFT for sale
  buy <tokenId> [nftContractAddress]           Buy listed NFT for sale
  cancel <tokenId> [nftContractAddress]        Cancel NFT listing
  help [command]                               display help for command
```

The `nftContractAddress` argument is optional and if not provided, it will use the address of my NFT contract by default.