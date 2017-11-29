import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util/DefaultClient';
import {IClientOpts} from '../common/interfaces';

const endpointPath = KrakenEndoints.OHLC;

export class OHLC extends Client {


    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    getAssets(assets, callback) {
        let message: any = {};

        if (assets !== null) {
            if (!(assets instanceof Array) || assets.length === 0) {
                throw new Error('Kraken:Assets: `assets` for non-null values need to be an array')
            }

            assets.forEach((asset) => {
                if (typeof asset !== 'string' || !asset) {
                    throw new Error('Kraken:Assets: every `asset` in array need to be a non-empty string')
                }
            });

            message.asset = assets.join(',')
        }

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);

            request
                .then((body) => {
                    resolve(body.result)
                }).catch(reject);

        }).then((response) => {

            if (typeof callback === 'function') {
                callback(response)
            }

            return response
        });
    }

    getAllAssets(callback) {
        return this.getAssets(null, callback)
    }

    getSingleAsset(asset, callback) {
        if (typeof asset !== 'string' || !asset) {
            throw new Error('Kraken:Assets: `asset` variable need to be a non-empty string')
        }

        return this.getAssets([asset], callback)
    }
}
