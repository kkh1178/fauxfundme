/* 
This file will help us access our DonationsCreation and prevent us from importing web3, donationsCreation everytime we want
to addess our deployed instance.
*/

import web3 from "./web3";
import FundraiserCreation from "./build/FundraiserCreation.json";

const instance = new web3.eth.Contract(
  JSON.parse(FundraiserCreation.interface),
    "0x12a587e271F3e12336854e13f347d269590a9ba0"
    );

export default instance;