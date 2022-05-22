//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ICoffee.sol";
import "./Bean.sol";
import "./IBean.sol";
import "./ICoffeeLine.sol";

contract Coffee is ICoffee {
    ///
    /// state
    ///

    string coffeeName;
    ICoffee.Origin originType;
    Bean bean;
    ICoffee.RoastType roastType;

    address owner;

    mapping(address => Review) reviews;

    Timeline timeline;

    ///
    /// constructor
    ///

    constructor(ICoffeeLine.RoastParams memory _params, address _owner) {
        coffeeName = _params.coffeeName;
        originType = _params.originType;
        bean = _params.bean;
        roastType = _params.roastType;

        owner = _owner;

        IBean.Timeline memory timelineTmp = bean.getTimeline(owner);
        timeline = Timeline({
            creationDate: timelineTmp.creationDate,
            sellDate: timelineTmp.sellDate,
            acquisitionDate: timelineTmp.acquisitionDate,
            roastDate: block.timestamp
        });
    }

    ///
    /// Public API
    ///

    function review(Review calldata _params) external {
        require(msg.sender != owner, "Owner cannot review");
        require(reviews[msg.sender].aroma == 0, "Review already exists");

        reviews[msg.sender] = _params;
    }

    function getTimeline() external view returns (Timeline memory timelineRes) {
        timelineRes = timeline;
    }
}
