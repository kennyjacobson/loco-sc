const hre = require("hardhat");
require("dotenv").config()

// const CUR_BASE_CONTRACT = "0x36F2ED8be6803942B044918420dDE57B6F253E97"
// const CUR_SCROLL_CONTRACT = "0xF13f389488dAcFb85446EB4725442FbB8FDBcA03"
const USE_CONTRACT = process.env.USECONTRACT

async function main() {
  const MyContract = await ethers.getContractFactory("Loco");
  const locations = await MyContract.attach(USE_CONTRACT);

//   const rtnLocation = await locations.locations(0)
//   console.log(`The return location: ${rtnLocation}`);

  const locationsCount = await locations.locationCount();
  console.log(`total parcel count: ${locationsCount}`);

  const rtnParcel2 = await locations.getLocationByName("The Forum");
  console.log(`The return parcel ${rtnParcel2}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
