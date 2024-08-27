import "@stdlib/deploy";

// Define messages for interacting with the contract
message SwapRequest {
    amount: Int as uint32;
    fromJetton: Address;
}

message AddJetton {
    amount: Int as uint32;
}

// Main contract: JettonDex
contract JettonDex with Deployable {
    owner: Address;
    jettonABalance: Int as uint32;
    jettonBBalance: Int as uint32;
    jettonAAddress: Address;
    jettonBAddress: Address;

    // Initialize contract with owner's address and initial jetton addresses
    init(owner: Address, jettonAAddress: Address, jettonBAddress: Address) {
        self.owner = owner;
        self.jettonABalance = 0;
        self.jettonBBalance = 0;
        self.jettonAAddress = jettonAAddress;
        self.jettonBAddress = jettonBAddress;
    }

    // Function to handle adding Jettons by owner
    fun addJetton(v: Int, jetton: Address) {
        // Check if sender is the owner
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");

        // Update appropriate balance
        if (jetton == self.jettonAAddress) {
            self.jettonABalance += v;
        } else if (jetton == self.jettonBAddress) {
            self.jettonBBalance += v;
        } else {
            require(false, "Unsupported jetton address");
        }
    }

    // Function to execute a jetton swap
    fun executeSwap(amount: Int, fromJetton: Address) {
        // Check if the swap is for supported jettons
        if (fromJetton == self.jettonAAddress) {
            require(amount <= self.jettonABalance, "Insufficient Jetton A balance");
            let amountToTransfer = (self.jettonBBalance * amount) / self.jettonABalance;
            require(amountToTransfer <= self.jettonBBalance, "Insufficient Jetton B for swap");
            self.jettonABalance -= amount;
            self.jettonBBalance += amountToTransfer;
        } else if (fromJetton == self.jettonBAddress) {
            require(amount <= self.jettonBBalance, "Insufficient Jetton B balance");
            let amountToTransfer = (self.jettonABalance * amount) / self.jettonBBalance;
            require(amountToTransfer <= self.jettonABalance, "Insufficient Jetton A for swap");
            self.jettonBBalance -= amount;
            self.jettonABalance += amountToTransfer;
        } else {
            require(false, "Unsupported jetton address for swap");
        }
    }

    // Receive method for adding jettons
    receive(msg: AddJetton) {
        self.addJetton(msg.amount, context().sender);
    }

    // Receive method for executing a swap
    receive(msg: SwapRequest) {
        self.executeSwap(msg.amount, msg.fromJetton);
    }

    // Getter for Jetton A balance
    get fun getJettonABalance(): Int {
        return self.jettonABalance;
    }

    // Getter for Jetton B balance
    get fun getJettonBBalance(): Int {
        return self.jettonBBalance;
    }
}