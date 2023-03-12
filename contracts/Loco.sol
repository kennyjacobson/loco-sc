// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract Loco {
    using Counters for Counters.Counter;
    
    struct Location {
        string name;
        string description;
        int32 latitude;  // divide by 10000000 for decimal value
        int32 longitude; // divide by 10000000 for decimal value
        bytes32 geohash;
        bytes32 geohash5;
        bytes32 geohash3;
    }

    mapping(uint256 => Location) public locations;
    mapping (string => uint256) public locationByName;
    mapping (bytes32 => uint256) public locationByGeohash;
    mapping (bytes32 => uint256[])  _locationsByGeohash5;
    mapping (bytes32 => uint256[])  _locationsByGeohash3;
    Counters.Counter public locationCount;

    event AddLocation(string name, bytes32 geohash);

    constructor()  {
        
    }

    function addLocation(string memory name, string memory description, int32 latitude, int32 longitude, bytes32 geohash) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        //console.log("Location added time is %o and block timestamp is %o", unlockTime, block.timestamp);
        locations[locationCount.current()].name = name;
        locations[locationCount.current()].description = description;
        locations[locationCount.current()].latitude = latitude;
        locations[locationCount.current()].longitude = longitude;
        locations[locationCount.current()].geohash = geohash;
        bytes32 geohash5 = bytes32(bytes5(geohash));
        bytes32 geohash3 = bytes32(bytes3(geohash));

        locationByName[name] = locationCount.current();
        locationByGeohash[geohash] = locationCount.current();
        _locationsByGeohash5[geohash5].push(locationCount.current());
        _locationsByGeohash3[geohash3].push(locationCount.current());

        locationCount.increment();

        emit AddLocation(name, geohash);
    }

    function getLocationByName(string memory name) public view returns(Location memory){
        return locations[locationByName[name]];
    }

    function getLocationByGeohash(bytes32 geohash) public view returns(Location memory){
        return locations[locationByGeohash[geohash]];
    }

    function getLocationsByGeohash5Count(bytes32 geohash5) public view returns(uint256){
        return _locationsByGeohash5[geohash5].length;
    }

    function getLocationByGeohash5ByIndex(bytes32 geohash5, uint256 index) public view returns(Location memory){
        return locations[_locationsByGeohash5[geohash5][index]];
    }

    function getLocationsByGeohash3Count(bytes32 geohash3) public view returns(uint256){
        return _locationsByGeohash3[geohash3].length;
    }

    function getLocationByGeohash3ByIndex(bytes32 geohash3, uint256 index) public view returns(Location memory){
        return locations[_locationsByGeohash3[geohash3][index]];
    }
}
