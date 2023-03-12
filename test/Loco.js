const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const LOCATIONS = [
  ["Union Station", "Transportation service",340562712,-1182374572,"9q5ctrwz" ],
  ["LA County Hall of Records", "lacourt.org",340557269,-1182465713,"9q5ctr9h" ],
  ["The Forum", "Venerated concert & performance center known for its circular design & Roman-style columns.",339583359,-1183448746,"9q5c5jcv" ]
]
const LOCATION_NAME = 0
const LOCATION_DESCRIPTION = 1
const LOCATION_LATITUDE = 2
const LOCATION_LONGITUDE = 3
const LOCATION_GEOHASH = 4
let counter = 0
let location_contract

describe("Loco", function () {
  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Loco = await ethers.getContractFactory("Loco");
    const loco = await Loco.deploy();
    return loco;
  }

  describe("Deployment", function () {
    it("Should deploy contract and contract should have zero locations to start with.", async function () {
      location_contract = await loadFixture(deploy);
      const locationCount = await location_contract.locationCount();
      expect(locationCount).to.equal(0);
    });
  });

  describe("Adding and Reading", function () {
    describe("Adding", function () {
      it("Add the three rows", async function () {
        for (const location of LOCATIONS) {
          const geohash8 = ethers.utils.formatBytes32String(location[4])
          const rtnLocation = await location_contract.addLocation(location[0],location[1],location[2],location[3],geohash8)
          counter++
        }
      })  

      it("Read the location count to make sure it is accurate", async function () {
        const locationCount = await location_contract.locationCount()
        expect(counter).to.equal(locationCount)
      })  

      it("Read a specific location from the contract and make sure it is accurate.", async function () {
        const lastLocation = LOCATIONS[counter-1]
        const lastLocationFromContract = await location_contract.locations(counter-1)
        expect(lastLocation[LOCATION_DESCRIPTION]).to.equal(lastLocationFromContract[LOCATION_DESCRIPTION])
      })  

      it("Read the first location by name", async function () {
        const locationName = LOCATIONS[0][LOCATION_NAME]
        const locationIndex = await location_contract.locationByName(locationName)
        expect(locationIndex).to.equal(0)

        const locationObject = await location_contract.getLocationByName(locationName)
        expect(locationObject[LOCATION_NAME]).to.equal(locationName)
      }) 

      it("Read the first location by geohash", async function () {
        const locationGeohash = ethers.utils.formatBytes32String(LOCATIONS[0][LOCATION_GEOHASH]) 
        const locationIndex = await location_contract.locationByGeohash(locationGeohash)
        expect(locationIndex).to.equal(0)

        const locationObject = await location_contract.getLocationByGeohash(locationGeohash)
        expect(locationObject[LOCATION_GEOHASH]).to.equal(locationGeohash)
      })

      it("Read locations by geohash5 (only two locations are in the same geohash5)", async function () {
        const geohash5 = ethers.utils.formatBytes32String(LOCATIONS[0][LOCATION_GEOHASH].substring(0,5))
        const locationsCount = await location_contract.getLocationsByGeohash5Count(geohash5)
        expect(locationsCount).to.equal(2)

        const lastLocationInGeohash5 = await location_contract.getLocationByGeohash5ByIndex(geohash5, locationsCount-1)
        expect(lastLocationInGeohash5[LOCATION_NAME]).to.equal(LOCATIONS[1][LOCATION_NAME])

      })

      it("Read locations by geohash3 (all three locations are in the same geohash3", async function () {
        const geohash3 = ethers.utils.formatBytes32String(LOCATIONS[0][LOCATION_GEOHASH].substring(0,3))
        const locationsCount = await location_contract.getLocationsByGeohash3Count(geohash3)
        expect(locationsCount).to.equal(3)

        const lastLocationInGeohash5 = await location_contract.getLocationByGeohash3ByIndex(geohash3, locationsCount-1)
        expect(lastLocationInGeohash5[LOCATION_NAME]).to.equal(LOCATIONS[2][LOCATION_NAME])
      })

    });

  });


});
