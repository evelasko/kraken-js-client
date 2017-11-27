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

import {Time} from './Time/Time';
import {Ticker} from './Ticker/Ticker';
import {TickerParts} from './Ticker/TickerParts';

import {OHLC} from './OHLC/OHLC';

import {Balance} from './Account/Balance';
import {Trades} from './Account/Trades/Trades';

import {Orders} from './Account/Orders/Orders';
import {OpenPositions} from './Account/OpenPositions';
import {Resolver} from './Resolver/Resolver';


const Account = {
    Balance,
    Trades,
    Orders,
    OpenPositions
};

export const Kraken = {
    Resolver,
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
