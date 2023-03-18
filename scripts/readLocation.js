const hre = require("hardhat");

const CUR_BASE_CONTRACT = "0x36F2ED8be6803942B044918420dDE57B6F253E97"

async function main() {
  const MyContract = await ethers.getContractFactory("Loco");
  const locations = await MyContract.attach(CUR_BASE_CONTRACT);

//   const rtnLocation = await locations.locations(0)
//   console.log(`The return location: ${rtnLocation}`);

  const locationsCount = await locations.locationCount();
  console.log(`total parcel count: ${locationsCount}`);

//   const rtnParcel2 = await parcels.parcelsByNumber("P-0012")
//   console.log(`The return parcel ${rtnParcel2}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
