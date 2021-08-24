import Web3 from "web3";

// This files runs twice, on the server initially and then again on the browser
let web3;

// importing network from .env file
const network = "HTTP://127.0.0.1:7545";

// We can use out code if the user has metamask or not
// window !== undefined means the user is using a browser and if window.ethereum isn't "undefined"
//  means a version of web3 has already been injected onto the window variable and metamask is available.
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" });
    /* window is a global variable and is only available to the browser; Next server 
    doesn't have access to that
    */
   web3 = new Web3(window.ethereum);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        // switching rinkeby out for ganache
        network
    );
    web3 = new Web3(provider);
  }
 
  export default web3;