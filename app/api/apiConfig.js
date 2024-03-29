export const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    // BASE_OL: "https://api.blocktrades.us/ol/v2",
    BASE_OL: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

export const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

export const settingsAPIs = {
    DEFAULT_WS_NODE: "wss://wallet.travelchain.io/ws",
    WS_NODE_LIST: [
        {url: "wss://wallet.travelchain.io/ws", location: "Main Server"},
        {url: "wss://sandbox.travelchain.io/ws", location: "Public Testnet Server"},
    ],
    DEFAULT_FAUCET: "https://wallet.travelchain.io/api/faucet/",
    TESTNET_FAUCET: "https://sandbox.travelchain.io/api/faucet/",
    RPC_URL: "https://openledger.info/api/"
};
