//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ICoffeeLine.sol";
import "./Bean.sol";
import "./IBean.sol";

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
        returns (Producer memory producer)
    {
        require(!_producerExists(), "Producer already exists");

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
        returns (Bean bean)
    {
        require(_producerExists(), "Producer does not exist");

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
        returns (Roaster memory roaster)
    {
        require(!_roasterExists(msg.sender), "Roaster already exists");

        Bean[] memory beans;
        Coffee[] memory coffees;

        roaster = Roaster({
            companyName: _params.companyName,
            companyAddress: _params.companyAddress,
            country: _params.country,
            email: _params.email,
            mobileNumber: _params.mobileNumber,
            equipment: _params.equipment,
            description: _params.description,
            image: _params.image,
            beans: beans,
            coffees: coffees
        });

        roasters[msg.sender] = roaster;
    }

    function getRoasterMobileNumber(address _roaster)
        external
        view
        returns (string memory)
    {
        return roasters[_roaster].mobileNumber;
    }

    function acquireBean(Bean _bean) external {
        require(_roasterExists(tx.origin), "Roaster does not exist");

        roasters[tx.origin].beans.push(_bean);
    }

    function roast(RoastParams calldata _params) external {
        require(_roasterExists(msg.sender), "Roaster does not exist");

        uint256 beansLength = roasters[msg.sender].beans.length;

        for (uint256 index = 0; index < beansLength; index++) {
            if (_params.bean == roasters[msg.sender].beans[index]) {
                Coffee coffee = new Coffee(_params, msg.sender);
                roasters[msg.sender].coffees.push(coffee);
                break;
            }
        }
    }

    ///
    /// Private Functions
    ///

    function _producerExists() private view returns (bool) {
        return bytes(producers[msg.sender].name).length > 0;
    }

    function _roasterExists(address _roaster) private view returns (bool) {
        return bytes(roasters[_roaster].companyName).length > 0;
    }
}
