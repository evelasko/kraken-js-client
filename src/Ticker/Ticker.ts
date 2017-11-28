import {forEach} from 'lodash';
import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {TickerInfo} from './TickerInfo';
import {Client} from '../Util/DefaultClient';
import {IKrakenResponse} from '../Clients/HttpClient';

const MODULE_NAME = '[Kraken:Ticker]';
const endpointPath = KrakenEndoints.Ticker;

function createTickerCollection(rawResponse) {

    let collection: Array<TickerInfo> = [];

    forEach(rawResponse, (rawTickerData, tickerPair) => {
        collection.push(new TickerInfo(rawTickerData, tickerPair))
    });

    return collection;
}

export class Ticker extends Client {


    constructor(opts, client?) {
        super(opts, client);
    }

    getPairsTickers(assetPairs, callback) {
        let message: any = {};

        if (assetPairs !== null) {
            if (!(assetPairs instanceof Array) || assetPairs.length === 0) {
                throw new Error(MODULE_NAME + 'Kraken:Assets: `assetPairs` for non-null values need to be an array');
            }

            assetPairs.forEach((assetPair) => {
                if (typeof assetPair !== 'string' || !assetPair) {
                    throw new Error(MODULE_NAME +' every `assetPair` in array need to be a non-empty string');
                }
            });

            message.pair = assetPairs.join(',');
        }

        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath, message);

            request
                .then((body: IKrakenResponse) => {
                    const tickerCollection = createTickerCollection(body.result);
                    resolve(tickerCollection);
                }).catch(reject);

        }).then((response) => {

            if (typeof callback === 'function') {
                callback(response);
            }

            return response;
        })
    }

    getSinglePairTicker(assetPair, callback) {

        if (typeof assetPair !== 'string' || !assetPair) {
            throw new Error(MODULE_NAME +' `assetPair` variable need to be a non-empty string');
        }

        return this.getPairsTickers([assetPair], callback)
            .then(collection => collection[0]);
    }

}

