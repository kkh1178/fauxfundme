/* 
This file will help us access our DonationsCreation and prevent us from importing web3, donationsCreation everytime we want
to addess our deployed instance.
*/

import web3 from "./web3";
import FundraiserCreation from "./build/FundraiserCreation.json";

const instance = new web3.eth.Contract(
  JSON.parse(FundraiserCreation.interface),
    "0x78ee6c2088aF8b776A3A8b6C29949b23C2949e4c"
    );

export default instance;