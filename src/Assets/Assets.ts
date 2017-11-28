
import {PublicClient} from '../Clients/PublicClient';
import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Util} from '../Util/Util';

const endpointPath = KrakenEndoints.Assets;

export class Assets {
    protected client: PublicClient;

    constructor() {
        this.client = new PublicClient();
    }

    getAssets(assets: Array<string>, callback?) {
        let message: any = {};

        Util.validateAssets(assets);

        message.asset = assets.join(',');

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);
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

    getAllAssets(callback) {
        return this.getAssets([], callback);
    }

    getSingleAsset(asset, callback) {
        Util.validateAsset(asset);
        return this.getAssets([asset], callback);
    }
}
