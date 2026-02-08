// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

/// @title MyToken
/// @author WalletsAndMore
/// @notice Sample ERC20 token for scaffolding.
/// @custom:security-contact security@walletsandmore.local
contract MyToken is ERC20, Ownable {
    constructor() ERC20('MyToken', 'MTK') Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /// @notice Mint new tokens to a recipient.
    /// @param to Address receiving tokens.
    /// @param amount Amount to mint.
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
