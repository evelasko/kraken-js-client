import * as request from 'request-promise'
import * as qs from 'querystring';

import {Config} from '../Config';
import {Retry} from '../Common/Retry';
import {MessageSignature} from './MessageSignature'

const KRAKEN_API_ENDPOINT_URL = Config.KRAKEN_API_ENDPOINT;

export interface IClientOpts {
    retryCount: number;
    retryDelay: number;
}

export class AuthorizedClient {

    private apiKey: string;
    private otp: string;

    private retryCount: number;
    private retryDelay: number;
    protected MessageSignature: MessageSignature;

    constructor({apiKey, apiSecret, otp}, opts?: IClientOpts) {
        opts = opts || {};
        this.apiKey = apiKey;
        this.otp = otp;

        this.MessageSignature = new MessageSignature();
        this.MessageSignature.setSecret(apiSecret);

        if (opts.retryCount) {
            this.retryCount = opts.retryCount;
        }

        if (opts.retryDelay) {
            this.retryDelay = opts.retryDelay;
        }
    }

    post(path, data) {
        return this.requestRetry('POST', path, data);
    }

    get(path, data) {
        return this.requestRetry('GET', path, data);
    }

    put(path, data) {
        return this.requestRetry('PUT', path, data);
    }

    delete(path, data) {
        return this.requestRetry('DELETE', path, data);
    }

    requestRetry(...args) {
        let resource = new Retry(this._request, this);


        if (this.retryDelay) {
            resource.setRetryDelay(this.retryDelay);
        }

        if (this.retryCount) {
            resource.setRetryCount(this.retryCount);
        }

        return resource.request(...args);
    }

    _request(method, path, message) {

        /**
         * Need message to be empty object as default so extending will work
         * @type {*|{}}
         */
        message = message || {};

        const nonce = this.getNonce();

        let authData = {
            nonce: nonce,
            otp: this.otp
        };

        let data = Object.assign(message, authData);

        const _messageSignature = this.MessageSignature.getSignature(path, data, nonce);
        const url = KRAKEN_API_ENDPOINT_URL + path;

        const options: any = {
            headers: {
                'User-Agent': 'Kraken Javascript API Client',
                'API-Key': this.apiKey,
                'API-Sign': _messageSignature
            },
            method: method.toUpperCase(),
            resolveWithFullResponse: true,
            uri: url
        };

        if (method.toLowerCase() === 'get') {
            options.qs = data;
        } else {
            options.body = qs.stringify(data);
        }

        return new Promise((resolve, reject) => {

            request(options)
                .then((response) => {

                    let body;

                    try {
                        body = JSON.parse(response.body);
                    } catch (e) {
                        throw new Error('Cannot parse Kraken data response.');
                    }

                    if (body.error && body.error.length > 0) {
                        return reject(body.error);
                    }

                    return resolve(body.result);
                })
                .catch(e => reject(e))
        });

    }

    getNonce() {
        let time = new Date() as any;
        return time * 1000;
    }

}
