// Clients
import {PublicClient} from './clients/PublicClient'
import {HttpClient} from './clients/HttpClient';

// Assets
import {Assets} from './assets/Assets';
import {AssetPairs} from './assets/AssetPairs';
// Orders
import {OrderSides} from './order/OrderSides';
import {OrderTypes} from './order/OrderTypes';
import {OrderFlags} from './order/OrderFlags';

import {Time} from './time/Time';
import {Ticker} from './ticker/Ticker';
import {TickerParts} from './ticker/TickerParts';

import {OHLC} from './ohlc/OHLC';

import {Balance} from './account/Balance';
import {Trades} from './account/Trades/Trades';

import {Orders} from './account/Orders/Orders';
import {OpenPositions} from './account/OpenPositions';
import {Resolver} from './resolver/Resolver';


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
    HttpClient,
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
