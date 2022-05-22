//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./CoffeeLine.sol";
import "./IBean.sol";

contract Bean is IBean {
    using SafeERC20 for IERC20;

    ///
    /// constants
    ///

    address cEUR = 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F;
    address cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

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

    mapping(string => SaleDetails) sales;

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

    function sellTo(
        string memory _phoneNumber,
        uint256 _weightInKg,
        uint256 _price
    ) external {
        require(msg.sender == producer, "Only the producer can sell its Bean");
        require(_weightInKg > 0, "The amount should be significant");
        require(
            _weightInKg <= remainderWeightInKg,
            "The remainder amount is less than the selling amount"
        );
        require(_price > 0, "The price should be significant");

        SellPosition memory position = SellPosition({
            weightInKg: _weightInKg,
            price: _price,
            phoneNumber: _phoneNumber,
            sold: false,
            timestamp: block.timestamp
        });

        sales[_phoneNumber].sellPosition = position;

        remainderWeightInKg -= _weightInKg;
    }

    function acquireBean(address _token) external {
        string memory mobileNumber = coffeeLine.getRoasterMobileNumber(
            msg.sender
        );

        require(
            sales[mobileNumber].sellPosition.weightInKg > 0,
            "Sell Position does not exist"
        );
        require(
            !sales[mobileNumber].sellPosition.sold,
            "Position is already sold"
        );

        require(_token == cEUR || _token == cUSD, "token is not cEUR or cUSD");

        IERC20(_token).safeTransferFrom(
            msg.sender,
            producer,
            sales[mobileNumber].sellPosition.price
        );

        Acquisition memory acquisition = Acquisition({
            timestamp: block.timestamp
        });

        sales[mobileNumber].acquisition = acquisition;

        SellPosition storage position = sales[mobileNumber].sellPosition;
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
        string memory mobileNumber = coffeeLine.getRoasterMobileNumber(
            _roaster
        );

        return
            Timeline({
                creationDate: creationDate,
                sellDate: sales[mobileNumber].sellPosition.timestamp,
                acquisitionDate: sales[mobileNumber].acquisition.timestamp
            });
    }
}
