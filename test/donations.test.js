const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFundraiserCreation = require('../ethereum/build/FundraiserCreation.json');
const compiledFundraiser = require('../ethereum/build/Fundraiser.json');

// Initializing variables to prevent issues with scope
let accounts;
let create;
let fundraiserAddress;
let fundraiser;

/*
To run these tests, add "dev": "node server.js" to package.json and "npm run test" from command line.
*/
beforeEach(async () => {
    // Get the accounts list
    accounts = await web3.eth.getAccounts();
    // looks for the ABI of createDonations contract; deploy a new instance of our object
    create = await new web3.eth.Contract(JSON.parse(compiledFundraiserCreation.interface)).deploy({
        data: compiledFundraiserCreation.bytecode
    }).send({
        from: accounts[0],
        gas:"1000000"
    });

    // Use create to make an instance of a fundraiser; Don't forget to make sure the number is a string
    await create.methods.createFundraiser(accounts[accounts.length - 1], web3.utils.toWei('2', 'ether')).send({
        from: accounts[0],
        gas: '1000000'
    });
    /*
     Use getDeployedDonations to get access to the address of the deployed fundraiser; We are only 
     requesting data; 
    */ 
    [fundraiserAddress] = await create.methods.getDeployedFundraiser().call();

    // Also getting the abi of the Donations contract
    fundraiser = await new web3.eth.Contract(
        JSON.parse(compiledFundraiser.interface),
        fundraiserAddress
        );
});

describe("Fundraiser", () => {
    // Makes sure that both contracts are deployed by checking for their addresses
    it("1. deploys a create and a fundraiser", () => {
        assert.ok(create.options.address);
        assert.ok(fundraiser.options.address);
    });

    // Checking to see if the first person in accounts and the manager are the same address
    it("2. sets the fundraiser creator as the fundraiser manager", async() => {
        const manager = await fundraiser.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    // Checking to see if someone can donate to a go fauxfundme fundraiser
    it("3. allows people to donate money", async() => {
        let test = await web3.eth.getBalance(accounts[1])
        // console.log(`Balance for account[1]: ${test}`)
        
        await fundraiser.methods.contribute().send({
            value: "200",
            from: accounts[1],
        });
    });

    // Checking to make sure that only the beneficiary can withdraw
    it("4. not just anyone can withdraw funds", async() => {
        // set the variables manager and beneficiary
        let beneficiary = accounts[4];

        // create a donations fundraiser for the last account address in the accounts array
        await create.methods.createFundraiser(beneficiary, web3.utils.toWei('5', 'ether'));
        console.log(beneficiary)

        // Have another account contribute a large amount to it
        await fundraiser.methods.contribute().send({
            value: web3.utils.toWei('1', "ether"),
            from: accounts[0]
        });

        // trying to break stuff by attempting to steal the donations
        try{
            await fundraiser.methods.withdraw().send({
                from: accounts[1],
                gas: '1000000'
            });
            assert(false)
        } catch(err) {
            assert(err);
        }
    });   
})