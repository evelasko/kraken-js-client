const endpointPath = require('../Clients/KrakenEndpoints').Assets;
const PublicClient = require('../Clients/PublicClient');
const Helper = require('../Common/Helper');

class Assets {

    constructor() {
        this.client = new PublicClient();
    }

    getAssets(assets, callback) {
        let message = {};

        Helper.validateAssets(assets);
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
        return this.getAssets(null, callback);
    }

    getSingleAsset(asset, callback) {
        Helper.validateAsset(asset);
        return this.getAssets([asset], callback);
    }
}

module.exports = Assets;
