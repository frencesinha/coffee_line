//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./CoffeeLine.sol";
import "./IBean.sol";

contract Bean is IBean {
    ///
    /// state
    ///

    CoffeeLine coffeeLine;

    address producer;

    string coffeeBean;
    string process;
    string varietal;
    uint256 originalWeightInKg;
    string harvestDate;
    uint256 creationDate;

    uint256 remainderWeightInKg;

    mapping(address => SaleDetails) sales;

    ///
    /// Constructor
    ///

    constructor(
        address _producer,
        string memory _coffeeBean,
        string memory _process,
        string memory _varietal,
        uint256 _weightInKg,
        string memory _harvestDate,
        CoffeeLine _coffeeLine
    ) {
        require(
            address(_coffeeLine) != address(0x0),
            "CoffeeLine should be a valid address"
        );

        producer = _producer;

        coffeeBean = _coffeeBean;
        process = _process;
        varietal = _varietal;
        originalWeightInKg = _weightInKg;
        harvestDate = _harvestDate;
        creationDate = block.timestamp;

        remainderWeightInKg = _weightInKg;

        coffeeLine = _coffeeLine;
    }

    ///
    /// Public API
    ///

    function sellTo(address _to, uint256 _amount) external {
        require(msg.sender == producer, "Only the producer can sell its Bean");
        require(_amount > 0, "The amount should be significant");
        require(
            _amount <= remainderWeightInKg,
            "The remainder amount is less than the selling amount"
        );

        SellPosition memory position = SellPosition({
            weightInKg: _amount,
            roaster: _to,
            sold: false,
            timestamp: block.timestamp
        });

        sales[_to].sellPosition = position;

        remainderWeightInKg -= _amount;
    }

    function acquireBean(uint256 _amount) external {
        require(_amount > 0, "The payable amount should be greater than 0");
        require(
            sales[msg.sender].sellPosition.weightInKg > 0,
            "Sell Position does not exist"
        );
        require(
            !sales[msg.sender].sellPosition.sold,
            "Position is already sold"
        );

        Acquisition memory acquisition = Acquisition({
            amount: _amount,
            timestamp: block.timestamp
        });

        sales[msg.sender].acquisition = acquisition;

        SellPosition storage position = sales[msg.sender].sellPosition;
        position.sold = true;
    }

    function getTimeline() external view returns (Timeline memory) {
        return
            Timeline({
                creationDate: creationDate,
                sellDate: 0,
                acquisitionDate: 0
            });
    }

    function getTimeline(address _roaster)
        external
        view
        returns (Timeline memory)
    {
        return
            Timeline({
                creationDate: creationDate,
                sellDate: sales[_roaster].sellPosition.timestamp,
                acquisitionDate: sales[_roaster].acquisition.timestamp
            });
    }
}
