import web3 from './web3';
import Fundraiser from "./build/Fundraiser.json";

// We want to create a new instance of a contract, plug in our address and get the info out of it.

const fundraiser = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Fundraiser.interface),
        address
    );
};

export default fundraiser;