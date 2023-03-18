require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require('hardhat-abi-exporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  abiExporter: [
    {
      path: './abi/json',
      format: "json",
    },
    {
      path: './abi/minimal',
      format: "minimal",
    },
    {
      path: './abi/fullName',
      format: "fullName",
    },
  ],

  solidity: "0.8.18",
  networks: {
    arbgoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/Dq9ChvRLzbEpehB_J1QFCnkch88agnPi`,
      accounts: [process.env.ARBKEY]
    },
    'base-goerli': {
      url: 'https://goerli.base.org',
      accounts: [process.env.BASEKEY],
    },

  }
};
