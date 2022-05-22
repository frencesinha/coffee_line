//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IBean {
    ///
    /// Enums
    ///

    enum Grades {
        SPECIALTY,
        PREMIUM,
        NOTCLASSIFIED
    }

    ///
    /// Structs
    ///

    struct Timeline {
        uint256 creationDate;
        uint256 sellDate;
        uint256 acquisitionDate;
    }

    struct SaleDetails {
        SellPosition sellPosition;
        Acquisition acquisition;
    }

    struct Acquisition {
        uint256 timestamp;
    }

    struct SellPosition {
        uint256 weightInKg;
        uint256 price;
        string phoneNumber;
        bool sold;
        uint256 timestamp;
    }
}
