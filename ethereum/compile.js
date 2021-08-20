const path = require("path");
const solc = require('solc');
// file system module
const fs = require('fs-extra');

// 1. Delete the entire build folder
// get the current working directory and look for the build directory
const buildPath = path.resolve(__dirname, 'build');
// removes the build directory and everthing in it
fs.removeSync(buildPath);

// 2. Read the fauxfundme.sol file
// get path to contracts directory and then the fauxfundme.sol file
const fundraiserPath = path.resolve(__dirname, "contracts", "fauxfundme.sol");
// read in the source code from the above file
const source = fs.readFileSync(fundraiserPath, 'utf8');

console.log(fundraiserPath)
// 3. compile both contracts with solidity compiler
// pull everthing out of the file
const output = solc.compile(source, 1).contracts;
// check to make sure a directory exists and if it doesn't, create it.
fs.ensureDirSync(buildPath);

// console.log(fundraiserPath)
console.log("output", output);
// 4. Write output to the build directory
// iterate over the keys CampaignCreation and Donations and create json files for each
for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", '') + '.json'),
        output[contract]
    );
}

