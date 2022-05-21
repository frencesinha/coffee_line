//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IBean {
  ///
  /// Enums
  ///

  enum Timeline {
    CREATED,
    GRADED,
    ONSALE,
    ACQUIRED,
    ROASTED
  }

  enum Grades {
    SPECIALTY,
    PREMIUM,
    NOTCLASSIFIED
  }

  ///
  /// Structs
  ///

  struct Grade {
    Grades grade;
    string image;
  }
}
