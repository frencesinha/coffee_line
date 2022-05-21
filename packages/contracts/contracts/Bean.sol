//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IBean.sol";

contract Bean is IBean {
    ///
    /// state
    ///

    string coffeeBean;
    string process;
    string varietal;
    uint256 weightInKg;
    string harvestDate;

    Timeline timeline;

    uint256 creationDate;

    ///
    /// Constructor
    ///

    constructor(
        string memory _coffeeBean,
        string memory _process,
        string memory _varietal,
        uint256 _weightInKg,
        string memory _harvestDate
    ) {
        coffeeBean = _coffeeBean;
        process = _process;
        varietal = _varietal;
        weightInKg = _weightInKg;
        harvestDate = _harvestDate;

        timeline = Timeline.CREATED;

        creationDate = block.timestamp;
    }
}
