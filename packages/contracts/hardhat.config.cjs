require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')
require('hardhat-storage-layout')
require('@openzeppelin/hardhat-upgrades')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.22',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout']
        }
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: process.env.SEPOLIA_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  storageLayout: {
    outputDirectory: './storage-layouts',
    flat: false
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      sepolia: 'blockscout'
    },
    customChains: [
      {
        network: 'sepolia',
        chainId: 11155111,
        urls: {
          apiURL: 'https://eth-sepolia.blockscout.com/api',
          browserURL: 'https://eth-sepolia.blockscout.com'
        }
      }
    ]
  }
}
