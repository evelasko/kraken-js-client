import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Util} from '../Util/Util';
import {Client} from '../util/DefaultClient';
import {IClientOpts} from '../common/interfaces';

const endpointPath = KrakenEndoints.Assets;

export class Assets extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    getAssets(assets: Array<string>, callback?) {
        let message: any = {};

        Util.validateAssets(assets);

        message.asset = assets.join(',');

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);
            request
                .then((body) => {
                    resolve(body.result)
                })
                .catch(reject);
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
