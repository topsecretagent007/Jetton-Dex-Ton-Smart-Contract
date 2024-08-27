import { toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { JettonDex, AddJetton } from "./output/sample_JettonDex"; // Ensure correct imports
import { findErrorCodeByMessage } from './utils/error';

describe("JettonDex Contract", () => {
    it("should deploy correctly and handle operations", async () => {
        // Create a new blockchain sandbox
        let system = await Blockchain.create();
        
        // Create treasury wallets for the owner and another user
        let owner = await system.treasury("owner");
        let nonOwner = await system.treasury("non-owner");

        // Initialize contract parameters
        let jettonAAddress = owner.address;  // Use owner.address as a placeholder for testing
        let jettonBAddress = nonOwner.address;

        console.log(`Owner : ${jettonAAddress}`);
        console.log(`Receiver : ${jettonBAddress}`);


        // Deploy the JettonDex contract
        let contract = system.openContract(await JettonDex.fromInit(
            owner.address,
            jettonAAddress,
            jettonBAddress
        ));
        
        const deployResult = await contract.send(owner.getSender(), {
            value: toNano(1)
        }, {
            $$type: "Deploy",
            queryId: 0n
        });
        
        // Verify successful deployment
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });

        console.log("********* BEFORE ADD ***********");
        console.log(`Jetton balance ${await contract.getGetJettonABalance()}`);

        console.log("Add 10 Jetton")
        // Check initial Jetton A balance
        expect(await contract.getGetJettonABalance()).toEqual(0n);

        // Simulate the owner adding Jettons using the AddJetton message type
        const addJettonMessage: AddJetton = {
            $$type: "AddJetton",
            amount: 10n  // Use bigint notation for the amount
        };

        await contract.send(owner.getSender(), {
            value: toNano(1)
        }, addJettonMessage);

        console.log("********* AFTER ADD ************");
        console.log(`After add : Jetton balance ${await contract.getGetJettonABalance()}`);

        // Verify Jetton balance update
        expect(await contract.getGetJettonABalance()).toBeGreaterThan(0n);
        
        // Non-owner tries to add Jettons - should fail
        const nonOwnerResult = await contract.send(nonOwner.getSender(), {
            value: toNano(1)
        }, addJettonMessage);

        // Find the error code for invalid sender and ensure it's a number
        const errorCodeForInvalidSender = findErrorCodeByMessage(
            contract.abi.errors,
            "Invalid sender"
        ) ?? 0; // Fallback to a default error code 0 or adjust as needed

        expect(nonOwnerResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: false,
            exitCode: errorCodeForInvalidSender
        });
    });
});
