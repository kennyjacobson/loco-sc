const hre = require("hardhat");
require("dotenv").config()
// string memory name, 
// string memory description, 
// int32 latitude, 
// int32 longitude, 
// bytes32 geohash, 
// string memory streetAddress,
// string memory city,
// string memory state,
// string memory zipCode,
// string memory country
const LOCATIONS = [
    ["Union Station", "Transportation service",340562712,-1182374572,"9q5ctrwz","800 N Alameda St", "Los Angeles", "CA", "90012", "USA" ],
    ["LA County Hall of Records", "lacourt.org",340557269,-1182465713,"9q5ctr9h","12400 Imperial Hwy", "Los Angeles", "CA", "90061", "USA" ],
    ["The Forum", "Venerated concert & performance center known for its circular design & Roman-style columns.",339583359,-1183448746,"9q5c5jcv","3900 W Manchester Blvd", "Inglewood", "CA", "90305", "USA" ],
  ]
// const CUR_ARB_CONTRACT = "0x702130849DF2e2a8E530790e6Ca05f0980D17082"
// const CUR_BASE_CONTRACT = "0x36F2ED8be6803942B044918420dDE57B6F253E97"
const USE_CONTRACT = process.env.USECONTRACT

async function addLocation(name, description, latitude, longitude, geohash, streetAddress, city, state, zipCode, country ){
    if (latitude < 1000) {
        latitude = math.ceil(latitude * 10000000) 
        longitude = math.ceil(longitude * 10000000) 
    }
    const MyContract = await ethers.getContractFactory("Loco");
    const locations = await MyContract.attach(USE_CONTRACT);   
  
    const geohash10 = ethers.utils.formatBytes32String(geohash)
    // const estimation = await locations.estimateGas.addLocation(name, description, latitude, longitude, geohash10)
    // console.log(estimation)
    console.log(name, description, latitude, longitude, geohash10)
    await locations.addLocation(name, description, latitude, longitude, geohash10, streetAddress, city, state, zipCode, country)
  
}

async function main() {
    const this_location = LOCATIONS[2]
    await addLocation(this_location[0],this_location[1],this_location[2],this_location[3],this_location[4],this_location[5],this_location[6],this_location[7],this_location[8],this_location[9])
    console.log(`Done`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
