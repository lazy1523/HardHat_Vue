require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:7545/",
      saveDeployments: true
    },
    findora: {
      url: "https://prod-forge.prod.findora.org:8545",
      chainId:525,
      accounts: ['302b317163ee3b9cd41b143d80d78c12df6ab5566371070d48d6ecf1d8c40bbf']
    }
    //goerli: {
    //  url: "https://eth-goerli.alchemyapi.io/v2/" + process.env.ALCHEMY_API_KEY,
    //  accounts: [process.env.ALCHEMY_DEPLOYMENT_KEY]
    //}
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
