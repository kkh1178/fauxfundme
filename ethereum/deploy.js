const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
require('dotenv').config()


// Compilation is being done in a separate step and not on the fly;
const compiledFundraiserCreation = require('./build/FundraiserCreation.json');

// importing passphrase and nework in from the .env file
const mnemonic = process.env.MNEMOMIC;
const network = process.env.NETWORK;
// Fake wallet
const provider = new HDWalletProvider(
    mnemonic,
    // remember to change this to your own phrase!
    network
    // remember to change this to your own endpoint!
  );

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFundraiserCreation.interface)
    ).deploy({
        data: compiledFundraiserCreation.bytecode
    }).send({
        gas: "1000000",
        from: accounts[0]
    });
    console.log("Contract deployed to", result.options.address);
};

// Run in ethereum dir - node deploy.js
deploy();

