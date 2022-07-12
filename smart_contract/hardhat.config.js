require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/DD-b9GotmRBeQdfLUs1NqEoneGf03cvJ",
      accounts: ["bd829ad816cfd181c7bdd2fb2e8b21f4206a95d029febb3fe58e107d85ff67ce"]
    }
  }
};
