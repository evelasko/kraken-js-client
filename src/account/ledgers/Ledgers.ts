import {HttpClient} from '../../clients/HttpClient';
import {KrakenEndoints} from '../../clients/KrakenEndpoints';
import {forEach} from 'lodash';
import {LedgersType} from '../../common/types';
import {Client} from '../../util/DefaultClient';
import {IClientOpts, IKrakenResponse, IOtp} from '../../common/interfaces';

const MODULE_NAME = '[Kraken:Ledgers]';

export interface ILedgersInfo extends IOtp {
    aclass?: string; // asset class (optional): currency (default)
    asset?: string[] | string; // comma delimited list of assets to restrict output to (optional.  default = all)
    type?: LedgersType;
    start?: number | string; // unix timestamp
    end?: number | string; // unix timestamp
    ofs: number | string;
}

export interface IQueryLedgers extends IOtp {
    id: string[] | string; // comma delimited list of ledger ids to query info about (20 maximum)
}

export class Ledgers extends Client {

    constructor(opts?: IClientOpts, client?: HttpClient) {
        super(opts, client);
    }

    get(opts: ILedgersInfo): Promise<IKrakenResponse<any>> {
        return this.client
            .post(KrakenEndoints.Ledgers, opts);
    }

    query(opts: IQueryLedgers): Promise<IKrakenResponse<any>> {
        if (opts && opts.id && Array.isArray(opts.id)) {
            const assetPairs: any = opts.id;

            forEach(assetPairs, (assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME + ' Every `assetPair` in array need to be a non-empty string')
                }
            });

            opts.id = assetPairs.join(',');
        }

        return this.client
            .post(KrakenEndoints.QueryLedgers, opts);

    }

}
