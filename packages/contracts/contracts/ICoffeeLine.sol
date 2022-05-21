//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IBean.sol";

interface ICoffeeLine {

  ///
  /// Structs
  ///

  struct ProducerParams {
    string name;
    string farmName;
    string farmAddress;
    string country;
    string email;
    string mobileNumber;
    uint256 farmSizeSquareMeters;
    uint256 farmMASL;
    uint256 numberOfPeople;
    string description;
    string[] images;
  }

  struct Producer {
    string name;
    string farmName;
    string farmAddress;
    string country;
    string email;
    string mobileNumber;
    uint256 farmSizeSquareMeters;
    uint256 farmMASL;
    uint256 numberOfPeople;
    string description;
    string[] images;
    IBean[] beans; 
  }

  struct BeanParams {
    string name;
  }

  struct RoasterParams {
    string companyName;
    string companyAddress;
    string country;
    string email;
    string mobileNumber;
    string equipment;
    string description;
    string image;
  }

  struct Roaster {
    string companyName;
    string companyAddress;
    string country;
    string email;
    string mobileNumber;
    string equipment;
    string description;
    string image;
    IBean[] beans; 
  }

  ///
  /// Public API
  ///

  function createProducer(ProducerParams calldata _producer) external returns(Producer memory);

  function createBean(BeanParams calldata _bean) external returns(IBean);

  function createRoaster(RoasterParams calldata _bean) external returns(Roaster memory);
}