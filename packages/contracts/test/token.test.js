const { expect } = require('chai')

describe('MyToken', function () {
  it('mints initial supply', async function () {
    const [deployer] = await ethers.getSigners()
    const MyToken = await ethers.getContractFactory('MyToken')
    const token = await MyToken.deploy()
    await token.waitForDeployment()

    const balance = await token.balanceOf(deployer.address)
    expect(balance).to.be.gt(0n)
  })
})
