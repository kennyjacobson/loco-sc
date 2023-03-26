const hre = require("hardhat");
require("dotenv").config()
var fs = require('fs');
// const CUR_BASE_CONTRACT = "0x36F2ED8be6803942B044918420dDE57B6F253E97"
const USE_CONTRACT = process.env.USECONTRACT

async function addLocation(name, description, latitude, longitude, geohash ){
    if (latitude < 1000) {
        latitude = Math.ceil(latitude * 10000000) 
        longitude = Math.ceil(longitude * 10000000) 
    }
    const MyContract = await ethers.getContractFactory("Loco");
    const locations = await MyContract.attach(USE_CONTRACT);   
  
    const geohash10 = ethers.utils.formatBytes32String(geohash)
    // const estimation = await locations.estimateGas.addLocation(name, description, latitude, longitude, geohash10)
    // console.log(estimation)
    console.log(name, description, latitude, longitude, geohash10)
    await locations.addLocation(name, description, latitude, longitude, geohash10)
  
}

async function main() {
    var these_locations = JSON.parse(fs.readFileSync('./scripts/data/restaurantsLA.json', 'utf8'));
    for (this_location of these_locations){
        console.log(this_location.name,this_location.description,this_location.latitude,this_location.longitude,this_location.geohash)
        await addLocation(this_location.name,this_location.description,this_location.latitude,this_location.longitude,this_location.geohash)
        console.log("add one")
    }
    console.log(`All Done`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
