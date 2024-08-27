import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { JettonDex } from "./output/sample_JettonDex";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // Parameters
    const testnet = true;
    const packageName = "sample_JettonDex.pkg";  // Update to match your package name
    const owner = Address.parse("UQCqmlPSKX8vvdBPVBPK8Oz8DDsC2X4_gcUM8d6Vg1y35-MV");
    const jettonAAddress = Address.parse("UQCqmlPSKX8vvdBPVBPK8Oz8DDsC2X4_gcUM8d6Vg1y35-MV");  // Replace with Jetton A address
    const jettonBAddress = Address.parse("UQDlJqKrNN2Gmg_WR6EUcRy-0fJ-ECDIIFEMVcp7m8LDO1Gl");  // Replace with Jetton B address

    // Initialize the contract with required parameters
    const init = await JettonDex.init(owner, jettonAAddress, jettonBAddress);

    // Load required data from the generated package
    const address = contractAddress(0, init);
    const data = init.data.toBoc();
    const pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepare the package for deployment
    console.log("Uploading package...");
    const prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Display deployment information
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
