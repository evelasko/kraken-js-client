const AuthChecker = require('../../Common/AuthChecker');
const Endpoints = require('../../Clients/KrakenEndpoints');
const AuthenticatedClient = require('../../Clients/AuthorizedClient');

const MODULE_NAME = '[Trades:Volume]';

class TradeVolume {

    constructor(opts, client) {

        if (opts && !client) {
            new AuthChecker(opts);
        }

        if (client instanceof AuthenticatedClient) {
            this.client = client;
        } else {
            this.client = new AuthenticatedClient(opts);
        }

    }

    /**
     * opts.pair = comma delimited list of asset pairs to get fee info on (optional)
     * opts.fee-info = whether or not to include fee info in results (optional)
     *
     * @param opts
     * @returns {Promise}
     */
    get(opts) {

        if (opts && opts.pair && Array.isArray(opts.pair)) {
            let assetPairs = opts.pair;

            assetPairs.forEach((assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME + ' Every `assetPair` in array need to be a non-empty string')
                }
            });

            opts.pair = assetPairs.join(',')
        }

        return new Promise((resolve, reject) => {

            this.client.post(Endpoints.TradeVolume, opts)
                .then(resolve) //TODO: parse results first
                .catch(reject);

        });
    }
}

module.exports = TradeVolume;