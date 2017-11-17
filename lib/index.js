const PublicClient = require('./Clients/PublicClient');
const AuthorizedClient = require('./Clients/AuthorizedClient');

// Assets
const Assets = require('./Assets/Assets');
const AssetPairs = require('./Assets/AssetPairs');

// Orders
const OrderSides = require('./Order/OrderSides');
const OrderTypes = require('./Order/OrderTypes');
const OrderFlags = require('./Order/OrderFlags');

const Time = require('./Time');
const Ticker = require('./Ticker/Ticker');
const TickerParts = require('./Ticker/TickerParts');

const OHLC = require('./OHLC/OHLC');

const Balance = require('./Account/Balance');

const Account = {
    Balance
};

module.exports = {
    PublicClient,
    AuthorizedClient,
    Time,
    Assets,
    AssetPairs,
    OrderSides,
    OrderTypes,
    OrderFlags,
    Ticker,
    TickerParts,
    OHLC,
    Account
};
