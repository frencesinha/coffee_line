//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Bean.sol";
import "./IBean.sol";
import "./ICoffee.sol";
import "./Coffee.sol";

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
        Bean[] beans;
    }

    struct BeanParams {
        string coffeeBean;
        string process;
        string varietal;
        uint256 weightInKg;
        string harvestDate;
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
        Bean[] beans;
        Coffee[] coffees;
    }

    struct RoastParams {
        string coffeeName;
        ICoffee.Origin originType;
        Bean bean;
        ICoffee.RoastType roastType;
    }
}
