export type OrderType = 'buy' | 'sell';

export type OrderTypeType = 'market' | 'limit' | 'stop-loss' | 'take-profit'
    | 'stop-loss-profit' | 'stop-loss-profit-limit' | 'stop-loss-limit'
    | 'take-profit-limit' | 'trailing-stop' | 'trailing-stop-limit'
    | 'stop-loss-and-limit' | 'settle-position';

export type OrderFlagsType = 'viqc' | 'fcib' | 'fciq' | 'nompp' | 'post';
export type OrderCloseTimeType = 'open' | 'close' | 'both';

export type TradeTypeType = 'all' | 'any position' | 'closed position' | 'closing position' | 'no position';

export type LedgersType = 'all' | 'deposit' | 'withdrawal' | 'trade' | 'margin';