const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config.js");

const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 LINK per request
const GAS_PRICE_LINK = 1e9; // link per gas

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [BASE_FEE, GAS_PRICE_LINK];

  if (developmentChains.includes(network.name)) {
    log("Local network detected, deploying mocks");
    // deploy a mock vrfcoordinator
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args,
    });
    log("Mock deployed");
    log("--------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
