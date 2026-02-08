const { ethers } = require('hardhat')
const fs = require('fs')
const path = require('path')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  const MyToken = await ethers.getContractFactory('MyToken')
  const myToken = await MyToken.deploy()
  await myToken.waitForDeployment()

  const address = await myToken.getAddress()
  console.log('MyToken deployed to:', address)

  const contractInfo = {
    address,
    abi: JSON.parse(myToken.interface.format('json'))
  }

  const frontendPath = path.join(__dirname, '../../apps/frontend/src/contracts/MyToken.json')
  fs.mkdirSync(path.dirname(frontendPath), { recursive: true })
  fs.writeFileSync(frontendPath, JSON.stringify(contractInfo, null, 2))

  console.log('Contract ABI saved to apps/frontend/src/contracts/MyToken.json')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
