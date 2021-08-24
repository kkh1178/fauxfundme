/* 
This file will help us access our DonationsCreation and prevent us from importing web3, donationsCreation everytime we want
to addess our deployed instance.
*/

import web3 from "./web3";
import FundraiserCreation from "./build/FundraiserCreation.json";

const instance = new web3.eth.Contract(
  JSON.parse(FundraiserCreation.interface),
    "0x0258b03Ff7f9154A5C07C59eb58Fe94963411584"
    );

export default instance;