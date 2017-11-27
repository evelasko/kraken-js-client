
import {AuthorizedClient} from '../../Clients/AuthorizedClient';
import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {forEach} from 'lodash';

const MODULE_NAME = '[Kraken:Ledgers]';

export interface ILedgersInfo {
    aclass?: string; // asset class (optional): currency (default)
    asset?: Array<string> | string; // comma delimited list of assets to restrict output to (optional.  default = all)
    type?: 'all' | 'deposit' | 'withdrawal' | 'trade' | 'margin';
    start?: number | string; // unix timestamp
    end?: number | string; // unix timestamp
    ofs: number | string;
}

export interface IQueryLedgers {
    id: string[] | string // comma delimited list of ledger ids to query info about (20 maximum)
}

export class Ledgers extends AuthChecker {

    protected client: AuthorizedClient;


    constructor(opts) {
        super(opts);

        this.client = new AuthorizedClient(opts);
    }

    get(opts: ILedgersInfo) {
        return this.client
            .post(KrakenEndoints.Ledgers, opts);
    }

    query(opts: IQueryLedgers) {
        if (opts && opts.id && Array.isArray(opts.id)) {
            let assetPairs: any = opts.id;

            forEach(assetPairs, (assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME + ' Every `assetPair` in array need to be a non-empty string')
                }
            });

            opts.id = assetPairs.join(',')
        }

        return this.client
            .post(KrakenEndoints.QueryLedgers, opts);

    }

}