//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ICoffee {
    ///
    /// Enum
    ///

    enum RoastType {
        LIGHT,
        MEDIUM,
        DARK
    }

    enum Origin {
        BLEND,
        SINGLE
    }

    ///
    /// Structs
    ///

    struct Review {
        uint8 aroma;
        uint8 acidity;
        uint8 body;
        uint8 flavor;
        uint8 aftertaste;
    }

    struct Timeline {
        uint256 creationDate;
        uint256 sellDate;
        uint256 acquisitionDate;
        uint256 roastDate;
    }
}
