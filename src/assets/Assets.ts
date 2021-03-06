import {KrakenEndoints} from '../clients/KrakenEndpoints';
import {Util} from '../util/Util';
import {Client} from '../util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

const endpointPath = KrakenEndoints.Assets;

export class Assets extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    getAssets(assets: string[] | null, callback?): Promise<IKrakenResponse<any>> {
        const message: any = {};

        if (assets !== null) {
            Util.validateAssets(assets);
            message.asset = assets.join(',');
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

    getAllAssets(callback): Promise<IKrakenResponse<any>> {
        return this.getAssets(null, callback);
    }

    getSingleAsset(asset, callback): Promise<IKrakenResponse<any>> {
        Util.validateAsset(asset);

        return this.getAssets([asset], callback);
    }
}
