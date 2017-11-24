// Clients
import {PublicClient} from './Clients/PublicClient'
import {AuthorizedClient} from './Clients/AuthorizedClient';

// Assets
import {Assets} from './Assets/Assets';
import {AssetPairs} from './Assets/AssetPairs';

// Orders
import {OrderSides} from './Order/OrderSides';
import {OrderTypes} from './Order/OrderTypes';
import {OrderFlags} from './Order/OrderFlags';

import {Time} from './Time';
import {Ticker} from './Ticker/Ticker';
import {TickerParts} from './Ticker/TickerParts';

import {OHLC} from './OHLC/OHLC';

import {Balance} from './Account/Balance';
import {Trades} from './Account/Trades/Trades';

const Account = {
    Balance,
    Trades
};

export const Kraken = {
    Account,
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
};
