//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ICoffeeLine.sol";
import "./Bean.sol";

contract CoffeeLine is ICoffeeLine {
    ///
    /// State
    ///

    mapping(address => Producer) producers;

    mapping(address => Roaster) roasters;

    ///
    /// Constructor
    ///

    constructor() {}

    ///
    /// Public API
    ///

    function createProducer(ProducerParams calldata _params)
        external
        override(ICoffeeLine)
        returns (Producer memory producer)
    {
        require(_producerExists(), "Producer already exists");

        string[] memory images;
        Bean[] memory beans;

        producer = Producer({
            name: _params.name,
            farmName: _params.farmName,
            farmAddress: _params.farmAddress,
            country: _params.country,
            email: _params.email,
            mobileNumber: _params.mobileNumber,
            farmSizeSquareMeters: _params.farmSizeSquareMeters,
            farmMASL: _params.farmMASL,
            numberOfPeople: _params.numberOfPeople,
            description: _params.description,
            images: images,
            beans: beans
        });

        producers[msg.sender] = producer;
    }

    function createBean(BeanParams calldata _params)
        external
        override(ICoffeeLine)
        returns (Bean bean)
    {
      require(!_producerExists(), "Producer does not exist");

      bean = new Bean(
        msg.sender,
        _params.coffeeBean,
        _params.process,
        _params.varietal,
        _params.weightInKg,
        _params.harvestDate,
        this
      );

      producers[msg.sender].beans.push(bean);
    }

    function createRoaster(RoasterParams calldata _params)
        external
        override(ICoffeeLine)
        returns (Roaster memory roaster)
    {
        require(_roasterExists(), "Roaster already exists");

        Bean[] memory beans;

        roaster = Roaster({
            companyName: _params.companyName,
            companyAddress: _params.companyAddress,
            country: _params.country,
            email: _params.email,
            mobileNumber: _params.mobileNumber,
            equipment: _params.equipment,
            description: _params.description,
            image: _params.image,
            beans: beans
        });

        roasters[msg.sender] = roaster;
    }

    ///
    /// Private Functions
    ///

    function _producerExists() private view returns (bool) {
        return bytes(producers[msg.sender].name).length > 0;
    }

    function _roasterExists() private view returns (bool) {
        return bytes(roasters[msg.sender].companyName).length > 0;
    }
}
