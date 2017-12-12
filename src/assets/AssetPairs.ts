import { KrakenEndoints } from '../clients/KrakenEndpoints';
import { Client } from '../util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

const endpointPath = KrakenEndoints.AssetPairs;

export class AssetPairs extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    getAssetPairs(assetPairs: string[] | null, callback): Promise<IKrakenResponse<any>> {
        const message: any = {};

        if (assetPairs !== null) {
            if (!(assetPairs instanceof Array) || assetPairs.length === 0) {
                throw new Error('Kraken:AssetPairs: `assetPairs` for non-null values need to be an array')
            }

            assetPairs.forEach((assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error('Kraken:AssetPairs: every `assetPair` in array need to be a non-empty string')
                }
            });

            message.pair = assetPairs.join(',');
        }

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);
            request
                .then((body: IKrakenResponse<any>) => {
                    resolve(body);
                })
                .catch(reject);
        }).then((response: IKrakenResponse<any>) => {

            if (typeof callback === 'function') {
                callback(response);
            }

            return response;
        });
    }

    getAllAssetPairs(callback?): Promise<IKrakenResponse<any>> {
        return this.getAssetPairs(null, callback);
    }

    getSingleAssetPair(assetPair: string, callback?): Promise<IKrakenResponse<any>> {
        if (typeof assetPair !== 'string' || !assetPair) {
            throw new Error('Kraken:AssetPairs: `assetPair` variable need to be a non-empty string')
        }

        return this.getAssetPairs([assetPair], callback);
    }
}
