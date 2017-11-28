import { KrakenEndoints } from '../Clients/KrakenEndpoints';
import { Client } from '../Util/DefaultClient';

const endpointPath = KrakenEndoints.AssetPairs;

export class AssetPairs extends Client {


    constructor(opts = null, client?) {
        super(opts, client);
    }

    getAssetPairs(assetPairs, callback) {
        let message:any = {};

        if (assetPairs !== null) {
            if (!(assetPairs instanceof Array) || assetPairs.length === 0) {
                throw new Error('Kraken:AssetPairs: `assetPairs` for non-null values need to be an array')
            }

            assetPairs.forEach((assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error('Kraken:AssetPairs: every `assetPair` in array need to be a non-empty string')
                }
            })

            message.pair = assetPairs.join(',')
        }

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message)
            request
                .then((response) => {
                    if (response.statusCode !== 200) {
                        return reject(response)
                    }
                    resolve(response.body.result)
                })
        }).then((response) => {
            if (typeof callback === 'function') {
                callback(response)
            }

            return response
        })
    }

    getAllAssetPairs(callback) {
        return this.getAssetPairs(null, callback)
    }

    getSingleAssetPair(assetPair, callback) {
        if (typeof assetPair !== 'string' || !assetPair) {
            throw new Error('Kraken:AssetPairs: `assetPair` variable need to be a non-empty string')
        }

        return this.getAssetPairs([assetPair], callback)
    }
}
