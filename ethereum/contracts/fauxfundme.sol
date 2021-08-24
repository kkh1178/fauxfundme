pragma solidity ^0.4.21;

// // Contract over donation campaigns being deployed, but withtout having to pay for instance
contract FundraiserCreation {
    address[] public deployedFundraiser;
    
    // Create a new gofundme campaign
    function createFundraiser(address beneficiary, uint moneyGoal, string mission) public {
        address newFundraiser = new Fundraiser(msg.sender, beneficiary, moneyGoal, mission);
        deployedFundraiser.push(newFundraiser);
    }
    
    // get an array of all of the active campaigns
    function getDeployedFundraiser() public view returns(address[]) {
        return deployedFundraiser;
    }
}

// Creating a donations website like gofundme
contract Fundraiser {

    // Event for storing the address of contributors plus the amount they contributed 
    // (https://docs.soliditylang.org/en/v0.4.21/contracts.html#events)
    // (originally had a struct but it was costing too much in gas)
    // event Donor(
    //     address indexed _from,
    //     uint _value
    // );

    // event FundraiserMeta(
    //     uint mission
    // );
    
    /* 
    Lets start with declaring all of the instance variables (with types)
    that will exist in this contract.
    */ 
    
    // Person requesting donations
    address public manager;
    
    // total amount contributed
    uint public total;
    
    // count of donors
    uint public numberOfDonors;
    
    // who the contributions will go to
    address public beneficiary;
    
    // monetary goal of the campaign
    uint public goal;

    // NOTE this shouldn't be stored on the chain; change to IPFS
    string mission;
    
    // modifier to restrict who can withdraw money
    modifier restricted() {
        require(msg.sender==manager || msg.sender==beneficiary);
        _;
    }
   
    // constructor to create a gofundme donations campaign
    function Fundraiser (address creator, address recipient, uint moneyGoal, string purpose) public {
        manager = creator;
        beneficiary = recipient;
        goal = moneyGoal;
        mission = purpose;
        // emit FundraiserMeta(creator, recipient, moneyGoal, mission);
        // emit FundraiserMeta(1);
    }   
    
    // Function to contribute to a campaign
    function contribute() public payable{
        require(msg.value > 0);
        numberOfDonors++;
        
        total = msg.value + total;

        // Emitting an event for donor (for some reason, emit isn't recognized by my compiler so I omitted it)
        // emit Donor(msg.sender, msg.value);
        // emit Donor(msg.sender, msg.value);
    }
    
    // function to transfer funds to the beneficiary of the campaign
    function withdraw() public restricted {
        beneficiary.transfer(this.balance);
    }
    
    
    // Get a summary of the campaign numbers.
    function getSummary() public view returns(
        uint, uint, uint, string) {
            return (
                total,
                numberOfDonors,
                goal,
                mission
                );
        }
}