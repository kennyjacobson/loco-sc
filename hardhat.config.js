require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
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
