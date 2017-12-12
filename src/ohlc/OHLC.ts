import {KrakenEndoints} from '../clients';
import {Client} from '../util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';
import {isArray, forEach} from 'lodash';
import {Util} from '../util/Util';
import {IOHLCData, OHLCInfo} from './OHLCInfo';

const endpointPath = KrakenEndoints.OHLC;

export interface IOhlc {
    pair?: string; // optional if assets not passed as first param
    interval?: number | string; // time frame interval in minutes (optional): 1 (default), 5, 15, 30, 60, 240, 1440
    since?: string; // return committed OHLC data since given id (optional.  exclusive)
}

export interface IOHLCResponse {
    [key: string]: string[][];
}

export class OHLC extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    /**
     * Proxy
     *
     * @param {string} pair
     * @param {IOhlc} data
     * @returns {Promise<IKrakenResponse<any>>}
     */
    getPair(pair: string, data?: IOhlc): Promise<IOHLCData> {
        return this.get(pair, data);
    }

    /**
     * Proxy
     *
     * @param {string[]} pair
     * @param {IOhlc} data
     * @returns {Promise<IKrakenResponse<any>>}
     */
    getPairs(pair: string[], data?: IOhlc): Promise<IOHLCData> {
        return this.get(pair, data);
    }

    /**
     * OHLC.Get
     *
     * @param {string | string[]} pair
     * @param {IOhlc} data
     * @returns {Promise<IKrakenResponse<any>>}
     */
    get(pair: string | string[], data?: IOhlc): Promise<IOHLCData> {

        data = data || {};

        if (isArray(pair)) {
            forEach(pair, (a) => {
                Util.validateAsset(pair);
            });

            data.pair = pair.join(',');
        }

        if (typeof pair === 'string') {
            Util.validateAsset(pair);
            data.pair = pair;
        }

        return new Promise((resolve, reject) => {
            this.client
                .get(endpointPath, data)
                .then((d: IKrakenResponse<IOHLCResponse>) => {
                    const ohlc: OHLCInfo = new OHLCInfo(d.result);
                    resolve(ohlc.parse());
                })
                .catch(reject);
        });
    }
}
