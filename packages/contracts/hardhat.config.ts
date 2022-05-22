import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("tests", "Tests things", async (taskArgs, hre) => {
  const CoffeeLine = await hre.ethers.getContractFactory("CoffeeLine");
  // const CoffeeLine = await ethers.getContractFactory("CoffeeLine");
  const coffeeLine = await CoffeeLine.deploy();

  await coffeeLine.deployed();

  console.log("CoffeeLine deployed to:", coffeeLine.address);

  const accounts = await hre.ethers.getSigners();
  // const accounts = await ethers.getSigners();

  const producer = accounts[1];
  const roaster1 = accounts[2];
  const roaster2 = accounts[3];
  const consumer = accounts[4];

  const txproducer = await coffeeLine.connect(producer).createProducer({
      name: "producer",
      farmName: "farmname",
      farmAddress: "address",
      country: "country",
      email: "email",
      mobileNumber: "mobile",
      farmSizeSquareMeters: 1000,
      farmMASL: 100,
      numberOfPeople: 100,
      description: "description",
      images: ["image1", "image2"]
  });

  const txfailed = await coffeeLine.connect(roaster1).createBean({
    coffeeBean: "coffee bean",
    process: "process",
    varietal: "mnao sei",
    weightInKg: 1000,
    harvestDate: "20221"
  });

  const txsuccess = await coffeeLine.connect(producer).createBean({
    coffeeBean: "coffee bean",
    process: "process",
    varietal: "mnao sei",
    weightInKg: 1000,
    harvestDate: "20221"
  });

  const txcreateRoaster = await coffeeLine.connect(roaster1).createRoaster({
        companyName: "name",
        companyAddress: "address",
        country: "country",
        email: "email",
        mobileNumber: "number",
        equipment: "tipo o quê",
        description: "description",
        image: "image"
  });

  await coffeeLine.getRoasterMobileNumber(roaster1.address);

  console.log(txproducer);

  await coffeeLine.connect(producer).createBean

});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 42220,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
